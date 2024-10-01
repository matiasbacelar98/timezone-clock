<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useInterval } from '@vueuse/core';
import { DateTime } from 'luxon';
import Loading from '../components/Loading.vue';
import Info from '../components/Info.vue';
import Clock from '../components/Clock.vue';
import Quote from '../components/Quote.vue';
import Toggle from '../components/Toggle.vue';

//----- State -----//
const loading = ref(false);
const info = ref({ data: {}, timezoneInfo: {}, isOpen: false });
const clock = ref({
  currentTime: new Date(),
  formattedTime: '',
  dayStatus: 'morning',
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
  clock.value.formattedTime = timeFormatter(clock.value.currentTime, info.value.data.locale, info.value.data.timezoneName);

  // Check for updates in day status
  setDayStatus();
});

//----- Constants -----//
const DEV_MODE = 'development';

//----- Utilities -----//
async function getTimezoneInfo() {
  loading.value = true;

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
    clock.value.formattedTime = timeFormatter(clock.value.currentTime, data.locale, data.timezoneName);
    resume();

    // Define day status
    setDayStatus();

    loading.value = false;
  } catch (error) {
    if (import.meta.env.MODE === DEV_MODE) console.log(error);
    loading.value = false;
  }
}

function toggleInfo() {
  info.value.isOpen = !info.value.isOpen;
}

function setDayStatus(date) {
  const formattedDate = DateTime.fromJSDate(date).setZone(info.value.data.timezoneName).setLocale(info.value.data.locale).toFormat('HH:mm'); // use 24hour format to do the calculation
  const currentTime = parseInt(formattedDate);

  if (currentTime < 12) {
    clock.value.dayStatus = 'morning';
  } else if (currentTime < 18) {
    clock.value.dayStatus = 'afternoon';
  } else {
    clock.value.dayStatus = 'night';
  }
}

function timeFormatter(date, locale, timezone) {
  const timezoneDate = DateTime.fromJSDate(date).setZone(timezone).setLocale(locale);
  const hours = timezoneDate.get('hour') < 10 ? `0${timezoneDate.get('hour')}` : `${timezoneDate.get('hour')}`;
  const minutes = timezoneDate.get('minute') < 10 ? `0${timezoneDate.get('minute')}` : `${timezoneDate.get('minute')}`;
  return `${hours}:${minutes}`;
}

function getDateOfTheYear(date) {
  return String(Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24));
}

function getDayOfTheWeek(date) {
  const weekDay = date.getDay();
  const sundayVal = 0;
  return weekDay === sundayVal ? '7' : String(weekDay);
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
  <Loading v-if="loading" />
  <main
    v-else
    class="font-poppins w-full bg-cover bg-no-repeat bg-[50%_80%]"
    :class="{
      // This can be improved =>
      'bg-[url(../assets/img/night.jpg)]': clock.dayStatus === 'night',
      'bg-[url(../assets/img/afternoon.jpg)]': clock.dayStatus === 'afternoon',
      'bg-[url(../assets/img/morning.jpg)]': clock.dayStatus === 'morning',
    }"
  >
    <div class="flex flex-col justify-between min-h-screen backdrop-brightness-[.8]">
      <section v-show="!info.isOpen" class="pt-[56px] px-6 md:px-[80px] lg:px-[120px] xl:px-[160px]">
        <Quote />
      </section>

      <section
        class="px-6 md:px-[80px] lg:px-[120px] xl:px-[160px] md:flex md:justify-between"
        :class="{
          'py-[56px]': !info.isOpen,
          'pt-[56px]': info.isOpen,
        }"
      >
        <Clock
          :province="info?.data?.countryAbbreviations?.capital"
          :country="info?.data?.countryAbbreviations?.fips"
          :time="clock?.formattedTime"
          :dayStatus="clock?.dayStatus"
        />

        <button class="mt-10 md:mt-0 md:self-end" @click="toggleInfo">
          <Toggle :isOpen="info.isOpen" />
        </button>
      </section>

      <Info v-if="info.isOpen" :timezone="info?.timezone" :dayStatus="clock?.dayStatus" />
    </div>
  </main>
</template>
