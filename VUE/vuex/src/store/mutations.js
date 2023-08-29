// mutations should all be synchronous
// for asynchronus tasks, use actions
export default {
  // similar to vue's computer()
  setAuth(state, payload) {
    state.isLoggedIn = payload.isAuth;
  },
};
