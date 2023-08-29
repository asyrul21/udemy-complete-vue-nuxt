<template>
  <div class="posts-page">
    <post-list :posts="loadedPosts" />
  </div>
</template>

<script>
// import PostList from "../components/Posts/PostList.vue"; // moved to global/plugins import
export default {
  // components: {
  //   PostList,
  // },
  middleware: "log",
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
  // created() {
  //   /console.log(this.$store.getters.loadedPosts);
  // },
};
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
