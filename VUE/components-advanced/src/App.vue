<template>
  <div>
    <the-header></the-header>
    <!-- or -->
    <!-- <TheHeader /> -->
    <badge-list></badge-list>
    <user-info
      :full-name="activeUser.name"
      :info-text="activeUser.description"
      :role="activeUser.role"
    ></user-info>
    <!-- scoped slots -->
    <course-goals v-slot:default="slotProps">
      <h2>{{ slotProps.item }}</h2>
      <p>{{ slotProps.anotherProp }}</p>
    </course-goals>
    <hr />
    <h2>Dynamic Components</h2>
    <button @click="setSelectedComponent('active-goals')">Active Goals</button>
    <button @click="setSelectedComponent('manage-goals')">Manage Goals</button>
    <keep-alive>
      <component :is="selectedComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import BadgeList from "./components/BadgeList.vue";
import UserInfo from "./components/UserInfo.vue";
import CourseGoals from "./components/CourseGoals.vue";
//  dynamic components
import ActiveGoals from "./components/DynamicComponents/ActiveGoals.vue";
import ManageGoals from "./components/DynamicComponents/ManageGoals.vue";
export default {
  // local component registration
  components: {
    // "the-header": TheHeader, // or
    TheHeader: TheHeader, // auto transformed to kebab case in template
    "badge-list": BadgeList,
    userInfo: UserInfo,
    CourseGoals,
    ActiveGoals,
    ManageGoals,
  },
  data() {
    return {
      selectedComponent: "active-goals",
      activeUser: {
        name: "Maximilian Schwarzmüller",
        description: "Site owner and admin",
        role: "admin",
      },
    };
  },
  methods: {
    setSelectedComponent(comp) {
      this.selectedComponent = comp;
    },
  },
  mounted() {
    // console.log(slotProps);
  },
};
</script>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
