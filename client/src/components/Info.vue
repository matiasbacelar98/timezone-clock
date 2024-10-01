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
  dayStatus: {
    type: String,
    default: 'morning',
  },
});
</script>

<template>
  <section
    class="w-full mt-14 sm:mt-6 py-14 px-6 bg-opacity-90 md:px-[80px] lg:px-[120px] xl:px-[160px]"
    :class="{
      'bg-black text-white': props.dayStatus === 'night',
      'bg-gray-light text-gray-dark': props.dayStatus !== 'night',
    }"
  >
    <ul class="grid gap-y-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-y-8 lg:gap-y-0">
      <InfoItem :dayStatus="props?.dayStatus" title="current timezone" :content="props?.timezone?.name || 'Not available'" />
      <InfoItem :dayStatus="props?.dayStatus" title="day of the week" :content="props?.timezone?.dayOfTheWeek || 'Not available'" />
      <Line :dayStatus="props?.dayStatus" />
      <InfoItem :dayStatus="props?.dayStatus" title="day of the year" :content="props?.timezone?.dayOfTheYear || 'Not available'" :odd="true" />
      <InfoItem :dayStatus="props?.dayStatus" title="week number" :content="props?.timezone?.weekNumber || 'Not available'" :odd="true" />
    </ul>
  </section>
</template>
