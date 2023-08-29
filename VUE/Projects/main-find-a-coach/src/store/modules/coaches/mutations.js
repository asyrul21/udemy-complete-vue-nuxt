export default {
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  //cache
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
