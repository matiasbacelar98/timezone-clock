<script setup>
const props = defineProps({
  title: String,
  content: String,
  odd: {
    type: Boolean,
    default: false,
  },
  dayStatus: {
    type: String,
    default: 'morning',
  },
});
</script>

<template>
  <li
    class="flex items-center flex-wrap justify-between sm:flex-col sm:items-start sm:justify-start sm:space-y-2 lg:space-y-6"
    :class="{
      'lg:mt-[60px]': props.odd,
    }"
  >
    <span
      class="text-sm font-medium uppercase tracking-[0.08em]"
      :class="{
        'text-gray-medium-high': props.dayStatus !== 'night',
        'text-white': props.dayStatus === 'night',
      }"
    >
      {{ props.title || 'Not available' }}
    </span>
    <p class="break-all text-lg font-semibold tracking-[0.08em] uppercase lg:text-3xl xl:text-4xl">
      {{ props.content || 'Not available' }}
    </p>
  </li>
</template>
