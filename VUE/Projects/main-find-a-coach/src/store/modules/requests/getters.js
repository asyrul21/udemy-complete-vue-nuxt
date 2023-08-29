// always wrap getter with a computed
export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((r) => r.coachId === coachId);
  },
  hasRequests(_state, getters) {
    // return state.requests && state.requests.length > 0;
    return getters.requests && getters.requests.length > 0;
  },
};
