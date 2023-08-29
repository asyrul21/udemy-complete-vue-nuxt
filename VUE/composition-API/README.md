# Using Script Setup

```html
<script setup>
  import { ref } from 'vue';
  const uName = ref('Maximilian');
  setTimeout(function () {
    uName.value = 'Max';
  }, 2000);
</script>
```
