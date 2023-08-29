const app = Vue.createApp({
  data: function () {
    return {
      courseGoal: "Finish the Course",
      courseGoalA: "Finish the Course and Learn Vue!",
      courseGoalB: "Master Vue and build amazing apps!",
      vueLink: "https://vuejs.org/",
    };
  },
  methods: {
    outputGoal: function () {
      const randomNum = Math.random();
      if (randomNum < 0.5) {
        return this.courseGoalA;
      } else {
        return this.courseGoalB;
      }
    },
  },
});
app.mount("#user-goal");
