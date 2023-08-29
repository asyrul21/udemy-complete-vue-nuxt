<template>
  <ul>
    <li :class="{ active: modelValue === 'poor' }">
      <button type="button" @click="activateButton('poor')">Poor</button>
    </li>
    <li :class="{ active: modelValue === 'average' }">
      <button type="button" @click="activateButton('average')">Average</button>
    </li>
    <li :class="{ active: modelValue === 'great' }">
      <button type="button" @click="activateButton('great')">Great</button>
    </li>
  </ul>
</template>

<script>
export default {
  // to enable v-model from client
  props: ['modelValue'],
  emits: ['update:modelValue'],
  //   data() {
  //     return {
  //       activeOption: this.modelValue, // set value on load
  //     };
  //   },
  //   computed: {
  //     activeOption() {
  //       return this.modelValue;
  //     },
  //   },
  methods: {
    activateButton(op) {
      //   this.activeOption = op;
      this.$emit('update:modelValue', op);
    },
  },
};
</script>

<style scoped>
.active {
  border-color: #a00078;
}

.active button {
  color: #a00078;
}

ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
}

li {
  margin: 0 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
