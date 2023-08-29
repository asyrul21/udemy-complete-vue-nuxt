<template>
  <div>
    <h1>Users Page</h1>
    <input type="text" v-model.trim="userId" />
    <button @click="onLoadUser">Load User</button>
    <h2>Child Route:</h2>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
    };
  },
  methods: {
    onLoadUser() {
      this.$router.push("/users/" + this.userId);
    },
  },
  // nuxt props
  layout: "users",
};
</script>

<style scoped></style>
