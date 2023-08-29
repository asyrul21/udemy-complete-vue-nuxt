<template>
  <div class="admin-post-page">
    <section class="update-form">
      <admin-post-form :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/admin/AdminPostForm";
import { FIREBASE_URL } from "../../../constants";
export default {
  middleware: ["check-auth", "auth"], // order important
  layout: "admin",
  components: {
    AdminPostForm,
  },
  // NUXT METHOD
  // asyncData(context, doneCallback) {
  asyncData(context) {
    const postid = context.params.postId;
    return axios
      .get(FIREBASE_URL + "/posts/" + postid + ".json")
      .then((res) => {
        return {
          loadedPost: { ...res.data, id: postid },
        };
      })
      .catch((e) => context.error(e));
  },
  methods: {
    onSubmit(editedPost) {
      this.$store.dispatch("editPost", editedPost).then(() => {
        this.$router.push("/admin");
      });
    },
  },
};
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>
