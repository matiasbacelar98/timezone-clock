<script setup>
import InfoItem from './InfoItem.vue';
import Line from './Line.vue';

const props = defineProps({
  timezone: {
    name: String,
    dayOfTheYear: String,
    dayOfTheWeek: String,
    weekNumber: String,
  },
});
</script>

<template>
  <section class="absolute bottom-0 left-0 text-white bg-black w-full mt-14 py-14 px-6 bg-opacity-90 md:px-[80px] lg:px-[120px] xl:px-[160px]">
    <ul class="grid gap-y-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-y-8 lg:gap-y-0">
      <InfoItem title="current timezone" :content="props?.timezone?.name || 'Not available'" />
      <InfoItem title="day of the week" :content="props?.timezone?.dayOfTheWeek || 'Not available'" />
      <Line />
      <InfoItem title="day of the year" :content="props?.timezone?.dayOfTheYear || 'Not available'" :odd="true" />
      <InfoItem title="week number" :content="props?.timezone?.weekNumber || 'Not available'" :odd="true" />
    </ul>
  </section>
</template>
