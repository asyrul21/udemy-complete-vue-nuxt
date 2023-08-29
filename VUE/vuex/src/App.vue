<template>
  <base-container title="Vuex" v-if="isAuth">
    <the-counter />
    <favourite-value />
    <button @click="addOne">Add 10</button>
    <change-counter />
  </base-container>
  <base-container title="Auth">
    <user-auth></user-auth>
  </base-container>
</template>

<script>
import BaseContainer from './components/BaseContainer.vue';
import TheCounter from './components/TheCounter.vue';
import ChangeCounter from './components/ChangeCounter.vue';
import FavouriteValue from './components/FavouriteValue.vue';
import UserAuth from './components/UserAuth.vue';

export default {
  components: {
    BaseContainer,
    TheCounter,
    ChangeCounter,
    FavouriteValue,
    UserAuth,
  },
  // wrap getters with computed
  computed: {
    isAuth() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
  methods: {
    addOne() {
      // this.$store.state.counter += 11;
      // this.$store.commit('increment');
      // this.$store.commit({
      //   type: 'increase',
      //   value: 10,
      // });
      // this.$store.commit('increase', { value: 10 });
      // committing directly is an anti pattern
      //***
      // dispatch an action instead. Let action do the committing
      // ***

      this.$store.dispatch({
        type: 'numbers/increase',
        value: 10,
      });
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
