<template>
  <user-alert v-if="alertIsVisible" title="Add a User?" @close="hideAlert">
    <p>Do you want to continue with adding a user?</p>
  </user-alert>
  <section>
    <h2>Add a User</h2>
    <button @click="showAlert">Add User</button>
  </section>
</template>

<script>
import AlertMixin from '../mixins/alert.js';

export default {
  mixins: [AlertMixin],
  mounted() {
    console.log('Add User mounted');
  },
};
</script>
