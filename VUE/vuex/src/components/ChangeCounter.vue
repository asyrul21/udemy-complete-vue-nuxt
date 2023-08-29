<template>
  <!-- <button @click="increment">Add 2</button> -->
  <button @click="mappedIncrement">Add 2</button>
  <!-- <button @click="increase({ value: 11 })">Add 11</button> -->
  <button @click="mappedIncrease({ value: 11 })">Add 11</button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    // addOne() {
    //   //   this.$store.state.counter++;
    //   this.$store.dispatch('increment');
    // },
    // ...mapActions(['increment', 'increase']),
    // ...mapActions({
    //   mappedIncrement: 'increment',
    //   mappedIncrease: 'increase',
    // }),

    // with namespace
    ...mapActions({
      mappedIncrement: 'numbers/increment',
      mappedIncrease: 'numbers/increase',
    }),
  },
};
</script>
