import { createStore } from 'vuex';
import rootMutations from './mutations';
import rootActions from './actions';
import rootGetters from './getters';

//modules
import counterModule from './counter';

// root store module
const store = createStore({
  modules: {
    numbers: counterModule,
  },
  state() {
    // similar to vue's data(){}
    return {
      isLoggedIn: false,
    };
  },
  mutations: rootMutations,
  getters: rootGetters,
  actions: rootActions,
});

export default store;
