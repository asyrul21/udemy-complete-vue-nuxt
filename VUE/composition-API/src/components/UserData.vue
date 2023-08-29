<template>
  <h2>{{ fullName }}</h2>
  <h3>{{ user.age }}</h3>
</template>

<script>
import { computed, inject } from 'vue';
// lifecyle hooks
import {
  onBeforeMount,
  //   onMounted,
  //   onBeforeUpdate,
  //   onUpdated,
  //   onBeforeUnmount,
  //   onUnmounted,
} from 'vue';
export default {
  props: ['firstName', 'lastName'],
  setup(props, context) {
    const fullName = computed(() => {
      return props.firstName + ' ' + props.lastName;
    });

    onBeforeMount(() => {
      console.log('onBeforeMount');
    });

    // emitting
    console.log(context);
    // context.emit('save-data', 1);

    /*************************
     * INJECT: should onyl be read only
     ***********************/
    const user = inject('user');

    return {
      fullName,
      user,
    };
  },
};
</script>
