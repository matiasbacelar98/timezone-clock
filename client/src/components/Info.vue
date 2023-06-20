<script setup>
const props = defineProps({
  timezone: String,
});
</script>

<template>
  <p>{{ props.timezone || 'Not available' }}</p>
</template>
