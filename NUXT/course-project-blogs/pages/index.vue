<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <post-list :posts="loadedPosts" />
  </div>
</template>

<script>
// import PostList from "../components/Posts/PostList.vue"; // moved to global/plugins import
export default {
  name: "IndexPage",
  // components: { PostList },  // moved to global/plugins import
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPosts;
    },
  },
  // NUXT METHOD:
  // asyncData(context, doneCallback) {
  //   console.log("asyncData is executed");
  //   setTimeout(() => {
  //     doneCallback(null /* trigger error: new Error() */, {
  //       loadedPosts: [
  //         {
  //           id: "1",
  //           title: "First Post",
  //           previewText: "The first post",
  //           thumbnail:
  //             "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
  //         },
  //         {
  //           id: "2",
  //           title: "Second Post",
  //           previewText: "The second post",
  //           thumbnail:
  //             "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
  //         },
  //         {
  //           id: "3",
  //           title: "Third Post",
  //           previewText: "The third post",
  //           thumbnail:
  //             "https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg",
  //         },
  //       ],
  //     });
  //   }, 1500);
  // },
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url("~assets/images/main-page-background.jpg");
}

.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>
