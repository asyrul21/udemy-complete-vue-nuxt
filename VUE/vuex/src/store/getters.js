export default {
  // similar to react's Selectors / useSelector()
  userIsAuthenticated(state) {
    return state.isLoggedIn;
  },
};
