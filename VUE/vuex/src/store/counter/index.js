import counterMutations from './mutations';
import counterActions from './actions';
import counterGetters from './getters';

// counter store module
const counterModule = {
  namespaced: true,
  state() {
    return { counter: 0 };
  },
  mutations: counterMutations,
  actions: counterActions,
  getters: counterGetters,
};

export default counterModule;
