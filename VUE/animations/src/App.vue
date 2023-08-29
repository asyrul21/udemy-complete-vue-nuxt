<template>
  <!-- route animations -->
  <!-- but route components must only have ONE chile element -->
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
  <div class="container">
    <users-list></users-list>
  </div>
  <div class="container">
    <div class="block" :class="{ animate: animatedBlock }"></div>
    <button @click="animateBlock">Animate</button>
  </div>
  <div class="container">
    <!-- transition requires ONE direct child except for: see below-->
    <!-- disable css with: :css="false" -->
    <transition
      name="para"
      enter-to-class="custom-enter-class"
      @before-enter="beforeEnterTransition"
      @enter="enterTransition"
      @after-enter="afterEnterTransition"
      @before-leave="beforeLeaveTransition"
      @leave="leaveTransition"
      @after-leave="afterLeaveTransition"
      @enter-cancelled="enterTransitionCancelled"
      @leave-cancelled="leaveTransitionCancelled"
    >
      <!-- use name prop for custom prefix -->
      <p v-if="paraIsVisible">This is sometimes visible....</p>
    </transition>
    <button @click="toggleParagraph">Toggle Paragraph</button>
  </div>
  <div class="container">
    <transition name="fade-button" mode="out-in">
      <!-- v-if -else transition implementation -->
      <button @click="showUsers" v-if="!usersAreVisible">Show Users</button>
      <button @click="hideUsers" v-else>Hide Users</button>
    </transition>
  </div>
  <!-- <base-modal @close="hideDialog" v-if="dialogIsVisible"> -->
  <base-modal @close="hideDialog" :open="dialogIsVisible">
    <p>This is a test dialog!</p>
    <button @click="hideDialog">Close it!</button>
  </base-modal>
  <div class="container">
    <button @click="showDialog">Show Dialog</button>
  </div>
</template>

<script>
import UsersList from './components/ListData.vue';
export default {
  components: {
    UsersList,
  },
  data() {
    return {
      dialogIsVisible: false,
      animatedBlock: false,
      paraIsVisible: false,
      usersAreVisible: false,
      enterTransitionInterval: null,
      leaveTransitionInterval: null,
    };
  },
  methods: {
    /**
     * Transitions with Javascript
     */
    beforeEnterTransition(el) {
      console.log('before enter');
      console.log(el);
      el.style.opacity = 0;
    },
    enterTransition(el, done) {
      console.log('enter');
      console.log(el);
      let round = 1;
      this.enterTransitionInterval = setInterval(() => {
        el.style.opacity = round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.enterTransitionInterval);
          done();
        }
      }, 20);
    },
    afterEnterTransition(el) {
      console.log('after enter');
      console.log(el);
    },
    // fix flickering
    enterTransitionCancelled(el) {
      console.log(el);
      clearInterval(this.enterTransitionInterval);
    },
    beforeLeaveTransition(el) {
      console.log('before leave');
      console.log(el);
      el.style.opacity = 1;
    },
    leaveTransition(el, done) {
      console.log('leave');
      console.log(el);
      let round = 1;
      this.leaveTransitionInterval = setInterval(() => {
        el.style.opacity = 1 - round * 0.01;
        round++;
        if (round > 100) {
          clearInterval(this.leaveTransitionInterval);
          done();
        }
      }, 20);
    },
    afterLeaveTransition(el) {
      console.log('after leave');
      console.log(el);
    },
    leaveTransitionCancelled(el) {
      console.log(el);
      clearInterval(this.leaveTransitionInterval);
    },
    showDialog() {
      this.dialogIsVisible = true;
    },
    hideDialog() {
      this.dialogIsVisible = false;
    },
    animateBlock() {
      this.animatedBlock = !this.animatedBlock;
    },
    toggleParagraph() {
      this.paraIsVisible = !this.paraIsVisible;
    },
    showUsers() {
      this.usersAreVisible = true;
    },
    hideUsers() {
      this.usersAreVisible = false;
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
button {
  font: inherit;
  padding: 0.5rem 2rem;
  border: 1px solid #810032;
  border-radius: 30px;
  background-color: #810032;
  color: white;
  cursor: pointer;
}
button:hover,
button:active {
  background-color: #a80b48;
  border-color: #a80b48;
}
.block {
  width: 8rem;
  height: 8rem;
  background-color: #290033;
  margin-bottom: 2rem;
  /* transition: transform 0.3s ease-out; */
}
.container {
  max-width: 40rem;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  border: 2px solid #ccc;
  border-radius: 12px;
}
.animate {
  /* transform: translateX(-150px); */
  animation: slide-scale 0.3s ease-out forwards;
}

/* enter transition classes */
/* start state */
/* .v-enter-from { */
/* .para-enter-from { */
/* opacity: 0;
  transform: translateY(-30px); */
/* } */

/* .v-enter-active { */
/* .para-enter-active { */
/* transition: all 0.3s ease-out; */
/* animation: slide-scale 0.3s ease-out; */
/* dont need forwards */
/* } */

/* end state */
/* .v-enter-to { */
/* .para-enter-to { */
.custom-enter-class {
  border: 1px solid blue;
  /* opacity: 1;
  transform: translateY(0); */
}

/* leave transition classes */
/* .v-leave-from { */
/* .para-leave-from { */
/* opacity: 1;
  transform: translateY(0px); */
/* } */

/* .v-leave-active { */
/* .para-leave-active { */
/* transition: all 0.3s ease-in; */
/* animation: slide-scale 0.3s ease-out; */
/* } */

/* .v-leave-to { */
/* .para-leave-to { */
/* opacity: 0;
  transform: translateY(30px); */
/* } */

.fade-button-enter-active {
  animation: slide-scale 0.3s ease-out;
}

/* route transitions */
.route-enter-from {
}
.route-enter-active {
  animation: slide-scale 0.3s ease-out;
}
.route-enter-to {
}

.route-leave-from {
}
.route-leave-active {
}
.route-leave-to {
}

/* defining animations */
@keyframes slide-scale {
  0% {
    transform: translateX(0) scale(1);
  }
  70% {
    transform: translateX(-120px) scale(1.1);
  }
  100% {
    transform: translateX(-150px) scale(1);
  }
}
</style>
