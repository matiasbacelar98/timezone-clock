<script setup>
const props = defineProps({
  dayStatus: {
    type: String,
    default: 'morning',
  },
});
</script>

<template>
  <span
    class="hidden sm:block sm:rounded sm:col-span-3 sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-4 w-[1px] sm:place-self-center sm:h-full sm:mr-20 lg:mr-[104px] lg:ml-4"
    :class="{
      'bg-gray-dark': props.dayStatus !== 'night',
      'bg-white': props.dayStatus === 'night',
    }"
  />
</template>
