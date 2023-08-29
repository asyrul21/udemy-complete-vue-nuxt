const app = Vue.createApp({
  data() {
    return { goals: [], enteredGoalValue: "" };
  },
  methods: {
    addGoal: function () {
      if (this.enteredGoalValue !== "") {
        this.goals.push(this.enteredGoalValue);
      }
    },
    removeGoal: function (idx) {
      this.goals.splice(idx, 1);
    },
  },
});

app.mount("#user-goals");
