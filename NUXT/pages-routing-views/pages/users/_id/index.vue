<template>
  <h1>A singer user, with ID {{ $route.params.id }}</h1>
</template>

<script>
export default {
  // nuxt prop
  validate(data) {
    // data.params
    // data.query
    // data.store
    return /^\d+$/.test(data.params.id);
  },
  // nuxt prop
  layout: "users",
};
</script>
