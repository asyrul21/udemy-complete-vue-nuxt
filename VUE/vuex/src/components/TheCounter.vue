<template>
  <!-- <h3>{{ counter }}</h3> -->
  <h3>{{ finalCounter }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    // counter() {
    //   // return this.$store.state.counter;
    //   return this.$store.getters.finalCounter;
    // },
    // ...mapGetters(['finalCounter']),

    // with namespace
    ...mapGetters({
      finalCounter: 'numbers/finalCounter',
    }),
  },
};
</script>
