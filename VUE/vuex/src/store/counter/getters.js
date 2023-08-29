export default {
  finalCounter(state) {
    return state.counter * 2;
  },
  normalizedCounter(_, getters) {
    const finalCounter = getters.finalCounter;
    if (finalCounter < 0) {
      return 0;
    } else if (finalCounter > 100) {
      return 100;
    }
    return finalCounter;
  },
  // testAuth(_state, _getters, _rootState, _rootGetters) {
  testAuth(_state) {
    // this would not work
    return _state.isLoggedIn;
    // need to use root Getters
  },
};
