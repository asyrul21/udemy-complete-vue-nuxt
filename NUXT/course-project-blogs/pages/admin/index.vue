<template>
  <div class="admin-page">
    <section class="new-post">
      <app-button @click="$router.push('/admin/new-post')"
        >Create Post</app-button
      >
      <app-button style="margin-left: 10px" @click="onLogout"
        >Logout</app-button
      >
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list isAdmin :posts="loadedPosts" />
    </section>
  </div>
</template>

<script>
// import PostList from "../components/Posts/PostList.vue"; // moved to global/plugins import
// import AppButton from "@/components/UI/AppButton.vue"; // moved to global/plugins import
export default {
  middleware: ["check-auth", "auth"], // order important
  layout: "admin",
  // components: {
  //   PostList,
  //   AppButton,
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}

.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}

.existing-posts h1 {
  text-align: center;
}
</style>
