<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useInterval } from '@vueuse/core';
import Info from '../components/Info.vue';
import Clock from '../components/Clock.vue';
import Quote from '../components/Quote.vue';
import Toggle from '../components/Toggle.vue';

//----- State -----//
const info = ref({ data: {}, timezoneInfo: {}, isOpen: false });
const clock = ref({
  currentTime: new Date(),
  formattedTime: '',
  isTwelveHourFormat: false,
  dayStatus: '',
});

//----- Lifecycle & Effects -----//
const { counter, pause, resume } = useInterval(60000, { controls: true });

onBeforeMount(() => {
  pause();
  getTimezoneInfo();
});

watch(counter, () => {
  // Add 1 minute
  clock.value.currentTime = addMinutes(clock.value.currentTime, 1);
  clock.value.formattedTime = timeFormatter(info.value.data.locale, info.value.data.timezoneName).format(clock.value.currentTime);

  // Check for updates in day status
  !clock.value.isTwelveHourFormat ? twentyFourHoursFormat() : twelveHoursFormat();
});

//----- Constants -----//
const DEV_MODE = 'development';

//----- Utilities -----//
async function getTimezoneInfo() {
  try {
    const response = await fetch(import.meta.env.VITE_TIMEZONE_ENDPOINT);

    // If bad request throw error
    if (!response.ok) throw new Error(`Error HTTP: ` + response.status);

    //------ Success ------//
    // Save data
    const data = await response.json();
    info.value.data = data;
    info.value.timezone = {
      name: data?.timezoneName,
      dayOfTheYear: getDateOfTheYear(new Date()),
      dayOfTheWeek: getDayOfTheWeek(new Date()),
      weekNumber: getWeekNumber(new Date()),
    };

    // Start the clock
    clock.value.currentTime = new Date();
    clock.value.formattedTime = timeFormatter(data.locale, data.timezoneName).format(clock.value.currentTime);
    resume();

    // Define hour format (think if is gonna be used)
    clock.value.isTwelveHourFormat = timeFormatter(data.locale, data.timezoneName).resolvedOptions()['hour12'];

    // Define day status
    !clock.value.isTwelveHourFormat ? twentyFourHoursFormat() : twelveHoursFormat();
  } catch (error) {
    if (import.meta.env.MODE === DEV_MODE) console.log(error);
  }
}

function toggleInfo() {
  info.value.isOpen = !info.value.isOpen;
}

function twelveHoursFormat() {}

function twentyFourHoursFormat() {}

function timeFormatter(locale, timezone) {
  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getDateOfTheYear(date) {
  return String(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24));
}

function getDayOfTheWeek(date) {
  return String(date.getDay());
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return String(Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7));
}

function addMinutes(date, minutes) {
  const dateCopy = new Date(date);
  dateCopy.setMinutes(date.getMinutes() + minutes);
  return dateCopy;
}
</script>

<template>
  <main
    class="font-poppins min-h-screen bg-[url(../assets/img/afternoon.jpg)] bg-cover bg-no-repeat bg-[50%_80%] py-[56px] flex flex-col px-6 justify-between md:px-[80px] lg:px-[120px] xl:px-[160px]"
    :class="{ relative: info.isOpen }"
  >
    <Quote v-show="!info.isOpen" />

    <section class="md:flex md:justify-between mt-4">
      <Clock :province="info?.data?.countryAbbreviations?.capital" :country="info?.data?.countryAbbreviations?.fips" :time="clock?.formattedTime" />

      <button class="mt-10 md:mt-0 md:self-end" @click="toggleInfo">
        <Toggle :isOpen="info.isOpen" />
      </button>
    </section>

    <Info v-if="info.isOpen" :timezone="info?.timezone" />
  </main>
</template>
