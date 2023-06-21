<script setup>
const props = defineProps({
  title: String,
  content: String,
  odd: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <li
    class="list-none flex items-center flex-wrap justify-between sm:flex-col sm:items-start sm:justify-start sm:space-y-2 lg:space-y-6"
    :class="{
      'lg:mt-[60px]': props.odd,
    }"
  >
    <span class="text-sm inline-block font-medium uppercase tracking-[0.08em]">{{ props.title || 'Not available' }}</span>
    <p class="text-lg font-semibold tracking-[0.08em] uppercase lg:text-[32px] xl:text-[44px]">{{ props.content || 'Not available' }}</p>
  </li>
</template>
