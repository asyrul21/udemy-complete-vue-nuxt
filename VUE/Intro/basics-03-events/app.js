const app = Vue.createApp({
  data() {
    return {
      counter: 0,
      name: "",
      lastName: "",
      confirmedName: "",
      confirmedFullName: "",
    };
  },
  /**
   * Watch is not used in html template - best for non-data update
   */
  watch: {
    confirmedName: function (newValue, oldValue) {
      console.log("confirmedName was watched and updated");
    },
    // counter: function (newValue) {
    //   if (newValue > 10) {
    //     this.counter = 0;
    //   }
    // },
    counter: function (newValue) {
      if (newValue > 10) {
        const that = this;
        setTimeout(() => {
          that.counter = 0;
        }, 2000);
      }
    },
  },
  /**
   * Computed is executed only on dependency data update - best for data that depends on other data
   */
  computed: {
    fullNameComputed: function () {
      console.log("Running computed");
      if (this.name === "" || this.lastName === "") {
        return "";
      }
      return this.name + " " + this.lastName;
    },
  },
  /**
   * Methods are executed on any state update. Best for event binding or data binding
   */
  methods: {
    add: function () {
      this.counter = this.counter + 1;
    },
    reduce: function (num) {
      this.counter -= num;
    },
    setName: function (e, lastName) {
      // do whatever with second parameter
      this.name = e.target.value;
    },
    submitForm: function () {
      alert("Submitted!");
    },
    confirmInput: function () {
      this.confirmedName = this.name;
    },
    resetInput: function () {
      this.name = "";
      this.lastName = "";
    },
    outputFullName: function () {
      console.log("Running again");
      if (this.name === "") {
        return "";
      }
      return this.name + " " + "ahmad";
    },
  },
});

app.mount("#events");
