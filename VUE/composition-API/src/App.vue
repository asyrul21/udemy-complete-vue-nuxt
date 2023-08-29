<template>
  <section class="container">
    <user-data :firstName="firstName" :lastName="lastName" />
    <h2>
      Full Name: <span>{{ fullName }}</span>
    </h2>
    <h2>{{ user.name }}</h2>
    <h3>{{ user.age }}</h3>
    <h3>Description: {{ desc }}</h3>
    <button @click="setAge">Change Age</button>
    <div>
      <input type="text" placeholder="First Name" v-model.trim="firstName" />
      <input type="text" placeholder="Last Name" v-model.trim="lastName" />
      <input type="text" placeholder="Description" ref="descInput" />
      <button @click="setDesc">Submit Description</button>
    </div>
  </section>
</template>

<script>
// Using script setup: see REAME.md

// import { ref, reactive, isReactive, isRef, toRefs } from 'vue';
import { reactive, ref, computed, watch, toRefs, provide } from 'vue';

// components
import UserData from './components/UserData.vue';

export default {
  components: {
    UserData,
  },
  // OPTIONS API
  // data() {
  //   return {
  //     userName: 'Maximilian',
  //   };
  // },
  // COMPOSITION API
  setup() {
    /*************************
     * DATA: ref, reactive, toRefs
     ***********************/
    // const userName = ref('Maximillian');
    // const userAge = ref(21);
    const firstName = ref('');
    const lastName = ref('');
    const desc = ref('');
    const descInput = ref(null); // use as template refs;

    // for objects, use reactive()
    const user = reactive({
      name: 'Maximillian',
      age: 21,
    });

    // update values after 2 seconds
    // setTimeout(() => {
    //   // for primitive values:
    //   // userName.value = 'Asyrul';
    //   // userAge.value = 33;

    //   // for objects with reactive()
    //   user.name = 'Asyrul';
    //   user.age = 33;
    // }, 2000);

    // transforming children of objects into refs:
    const userPropRefs = toRefs(user);

    /*************************
     * METHODS
     ***********************/
    function setNewAge() {
      user.age = 32;
    }
    function setDesc() {
      desc.value = descInput.value.value;
    }

    /*************************
     * COMPUTED
     ***********************/
    // Computed variables are READONLY
    const fullName = computed(function () {
      return firstName.value + ' ' + lastName.value;
    });

    /*************************
     * WATCH
     ***********************/
    watch(userPropRefs.age, (newValue, oldValue) => {
      console.log('New:', newValue, 'old:', oldValue);
      console.log('age is updated');
    });

    watch([firstName, userPropRefs.age], (newValues, oldValues) => {
      console.log('firstName Old values:');
      console.log(oldValues[0]);
      console.log('firstName New values:');
      console.log(newValues[0]);

      console.log('Age Old values:');
      console.log(oldValues[1]);
      console.log('Age New values:');
      console.log(newValues[1]);
      console.log('name or age is updated');
    });

    // exposing primitive values: expose the ENTIRE ref variable
    // return {
    // userName,
    // age: userAge,
    // };

    /*************************
     * PROVIDE
     ***********************/
    // provide('user', user.age); // DOES NOT WORK
    provide('user', user);

    // exposing objects
    // MUST pass the whole object
    return {
      user,
      // userName: userPropRefs.name, // using toRefs // WORKS
      // age: userPropRefs.age, // using toRefs // WORKS
      setAge: setNewAge,
      firstName,
      lastName,
      fullName,
      descInput,
      setDesc,
      desc,
    };
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

.container {
  margin: 3rem auto;
  max-width: 30rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  text-align: center;
}
</style>
