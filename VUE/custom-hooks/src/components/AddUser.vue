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
import UserAlert from './UserAlert.vue';
import { useAlert } from '../hooks/alert';

export default {
  components: {
    UserAlert,
  },
  setup() {
    const { alertIsVisible, showAlert, hideAlert } = useAlert();
    // const { alertIsVisible, showAlert, hideAlert } = useAlert();

    // const alertIsVisible = ref(false);

    // function showAlert() {
    //   alertIsVisible.value = true;
    // }
    // function hideAlert() {
    //   alertIsVisible.value = false;
    // }

    return {
      alertIsVisible,
      showAlert,
      hideAlert,
    };
  },
};
</script>
