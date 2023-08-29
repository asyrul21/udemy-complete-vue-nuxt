import mutations from './mutations';
import getters from './getters';
import actions from './actions';

export default {
  // NOT namespaced
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations,
  getters,
  actions,
};
