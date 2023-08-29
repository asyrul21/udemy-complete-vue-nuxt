const app = Vue.createApp({
  data() {
    return {
      currentUserInput: "",
      message: "Vue is great!",
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      // ref example
      this.message = this.$refs["userTextRef"].value;
      // console.log(this.$refs["userTextRef"]);
    },
  },
  beforeCreate() {
    console.log("Before create!");
  },
  created() {
    console.log("App created!");
  },
  beforeMount() {
    console.log("before mount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("before update!");
  },
  updated() {
    console.log("Updated");
  },
  beforeUnmount() {
    console.log("beforeUnmount");
  },
  unmounted() {
    console.log("Unmounted");
  },
});

app.mount("#app");

setTimeout(() => {
  app.unmount();
}, 3000);

const app2 = Vue.createApp({
  template: `
    <p>I like {{favouriteMeal}}</p>
  `,
  data() {
    return {
      favouriteMeal: "pizza",
    };
  },
});

app2.mount("#app2");

// --- Javascript Proxy
const data = {
  message: "Hello!",
  longMessage: "Hello! World!",
};

const handler = {
  set(target, key, value) {
    // console.log(target);
    // console.log(key);
    // console.log(value);
    if (key === "message") {
      target.longMessage = value + " World!";
    }
    target.message = value;
  },
};

const proxy = new Proxy(data, handler);

proxy.message = "Hello!!!";

console.log(longMessage);
