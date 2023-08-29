import Vuex from "vuex";
import axios from "axios";
import Cookie from "js-cookie";
import { FIREBASE_URL } from "../constants";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, edittedPost) {
        const postIndex = state.loadedPosts.findIndex((post) => edittedPost.id);
        state.loadedPosts[postIndex] = edittedPost;
      },
      clearToken(state) {
        state.token = null;
      },
    },
    actions: {
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
        }
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = "";
        if (!authData.isLogin) {
          authUrl = process.env.firebaseSignUpUrl + process.env.firebaseApiKey;
        } else {
          authUrl = process.env.firebaseSignInUrl + process.env.firebaseApiKey;
        }
        return axios
          .post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((res) => {
            const token = res.data.idToken;
            const expiresIn = res.data.expiresIn;

            vuexContext.commit("setToken", token);
            localStorage.setItem("token", token);

            // token expiratio stuff
            const tokenExpirationTime =
              new Date().getTime() + Number.parseInt(expiresIn) * 1000;
            localStorage.setItem("tokenExpiration", tokenExpirationTime);

            // cookie stuff
            Cookie.set("jwt", token);
            Cookie.set("expirationDate", tokenExpirationTime);

            /**
             * Calling Server Middleware
             */
            return axios.post("http://localhost:3000/api/track-data", {
              data: "Track Data success",
            });
          })
          .catch((e) => console.log(e));
      },
      // will be run by middleware
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          /*
           *CHECKING AUTH ON SERVER
           */
          // on server, localStorage does not exist
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find((c) => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else if (process.client) {
          /*
           *CHECKING AUTH ON CLIENT
           */
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }
        if (new Date().getTime() > +expirationDate || !token) {
          // token expired
          console.log("No token or token is expired");
          vuexContext.dispatch("logout");
          return;
        }
        vuexContext.commit("setToken", token);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date(),
        };
        return axios
          .post(
            FIREBASE_URL + "/posts.json?auth=" + vuexContext.state.token,
            createdPost
          )
          .then((result) => {
            vuexContext.commit("addPost", {
              ...createdPost,
              id: result.data.name,
            });
          })
          .catch((e) => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            FIREBASE_URL +
              "/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            {
              ...editedPost,
              updatedDate: new Date(),
            }
          )
          .then((result) => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch((e) => console.log(e));
      },
      // NUXT ACTION METHOD
      /**
       * nuxtServerInit is not executed in Single Page App (SPA) mode, only in SSR/Universal mode
       */
      nuxtServerInit(vuexContext, context) {
        if (!process.client) {
          // TO CHECK IF WE ARE ON SERVER
          // console.log(context.req);
          // console.log(context.req.session);
        }
        return axios
          .get(process.env.baseUrl + "/posts.json")
          .then((res) => {
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch((e) => context.error(e));
        // return new Promise((resolve, reject) => {
        //   setTimeout(() => {
        //     vuexContext.commit("setPosts", [
        //       {
        //         id: "1",
        //         title: "First Post",
        //         previewText: "The first post",
        //         thumbnail:
        //           "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
        //       },
        //       {
        //         id: "2",
        //         title: "Second Post",
        //         previewText: "The second post",
        //         thumbnail:
        //           "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
        //       },
        //       {
        //         id: "3",
        //         title: "Third Post",
        //         previewText: "The third post",
        //         thumbnail:
        //           "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
        //       },
        //     ]);
        //     resolve();
        //     // throw error
        //     // reject(new Error());
        //   }, 1500);
        // });
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token !== null;
      },
    },
  });
};

export default createStore;
