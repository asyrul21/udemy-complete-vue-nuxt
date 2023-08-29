const { FIREBASE_URL } = require("./constants");
const bodyParser = require("body-parser");

export default {
  mode: "universal",
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "course-project-blogs",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap",
      },
    ],
  },

  /**
   * DOES NOT WORK
   */
  loading: { color: "red", height: "10px", duration: 5000 },
  /**
   * DOES NOT WORK
   */
  loadingIndicator: { name: "circle", color: "red" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/styles/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    /**
     * Extend Webpack Config
     */
    extend(config, ctx) {},
  },

  // environment variables
  env: {
    // can be accessed via: process.env.baseUrl
    baseUrl: process.env.BASE_URL || FIREBASE_URL,
    firebaseSignUpUrl:
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    firebaseSignInUrl:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
    firebaseApiKey: "AIzaSyDKiu5GlxuwXhhz4DD-L47_bqscdhwuPU4",
  },
  // router settings
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "*",
        component: resolve(__dirname, "pages/index.vue"),
      });
    },
    // linkActiveClass: 'whatever'
    // add global middleware
    middleware: "log",
  },
  // page transitions
  transition: {
    name: "fade",
    mode: "out-in",
  },
  // server middlewares
  serverMiddleware: [bodyParser.json(), "~/api"],
};
