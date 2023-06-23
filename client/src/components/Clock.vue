<script setup>
const props = defineProps({
  country: {
    type: String,
    default: 'Not available',
  },
  province: {
    type: String,
    default: 'Not available',
  },
  time: {
    type: String,
    default: '00:00',
  },
});
</script>
1
<template>
  <article class="text-white">
    <div class="space-x-3">
      <v-icon name="ri-moon-fill" />
      <!-- <v-icon name="md-wbsunny-round" /> -->
      <span class="uppercase sm:text-[18px]">Good night, it’s currently</span>
    </div>

    <div class="font-semibold text-[96px] uppercase sm:tracking-[0.08em] sm:text-[128px]">{{ time }}</div>

    <span class="uppercase tracking-[0.08em] font-medium sm:text-[18px]"
      >{{ props.province !== 'Not available' ? 'in' : '' }} {{ props.province }}, {{ props.country }}</span
    >
  </article>
</template>
