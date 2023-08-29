<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.author">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.thumbnail">Thumbnail</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.content"
      >Content</AppControlInput
    >
    <AppControlInput control-type="textarea" v-model="editedPost.previewText"
      >Preview Text</AppControlInput
    >
    <AppButton type="submit">Save</AppButton>
    <AppButton
      type="button"
      style="margin-left: 10px"
      btn-style="cancel"
      @click="onCancel"
      >Cancel</AppButton
    >
  </form>
</template>

<script>
// import AppControlInput from "@/components/UI/AppControlInput.vue"; // moved to global/plugins import
// import AppButton from "@/components/UI/AppButton.vue"; // moved to global/plugins import
export default {
  props: {
    post: {
      type: Object,
      required: false,
    },
  },
  // components: {
  //   AppButton,
  //   AppControlInput,
  // },
  data() {
    return {
      editedPost: this.post
        ? {
            ...this.post,
          }
        : {
            author: "",
            title: "",
            thumbnail: "",
            content: "",
            previewText: "",
          },
    };
  },
  emits: ["submit"],
  methods: {
    onSave() {
      // Save the post
      // console.log(this.editedPost);
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      // navigate
      this.$router.push("/admin");
    },
  },
};
</script>
