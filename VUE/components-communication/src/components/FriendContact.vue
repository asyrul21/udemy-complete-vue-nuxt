<template>
  <li>
    <h2>{{ name }} {{ isFavourite ? "(Fav)" : "" }}</h2>
    <button @click="toggleFavourite">Toggle Favourite</button>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? "Hide" : "Show" }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ phoneNumber }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ emailAddress }}
      </li>
    </ul>
    <button @click="$emit('delete', id)">Delete</button>
  </li>
</template>

<script>
export default {
  // defined props are camelCase
  // props are immutable
  // unidirectional data flow
  // props: ["name", "phoneNumber", "emailAddress", "isFavourite"], // array syntax
  props: {
    // object syntax
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: String,
    emailAddress: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["toggle-fav", "delete"],
  // emits: {
  //   "toggle-fav": function (id) {
  //     if (id) {
  //       return true;
  //     }
  //     console.warn("Id is missing");
  //     return false;
  //   },
  // },
  data() {
    return {
      detailsAreVisible: false,
      // friendIsFavourite: this.isFavourite, // initialise to prop value
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
      // this.phoneNumber
    },
    toggleFavourite() {
      // this.friendIsFavourite = !this.friendIsFavourite;

      // updates parent state
      this.$emit("toggle-fav", this.id);
    },
  },
};
</script>
