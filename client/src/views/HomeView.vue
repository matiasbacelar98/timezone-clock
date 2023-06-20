<script setup>
import { ref } from 'vue';
import Info from '../components/Info.vue';
import Clock from '../components/Clock.vue';
import Quote from '../components/Quote.vue';

//----- State -----//
const info = ref({
  data: {
    region: 'England',
    country: 'United Kingdom',
    countryAbbreviations: {
      continent: 'Europe',
      region: 'Western Europe',
      country: 'United Kingdom',
      capital: 'London',
      fips: 'UK',
      iso2: 'GB',
      iso3: 'GBR',
      isoNo: '826',
      internet: 'UK',
    },
    timezoneName: 'Europe/London',
  },
});
const isInfoOpen = ref(false);

//----- Lifecycle -----//
// onBeforeMount(() => {
//   getTimezoneInfo();
// });

//----- Utilities -----//
</script>

<template>
  <main class="font-poppins">
    <section
      class="min-h-screen bg-[url(../assets/img/afternoon.jpg)] bg-cover bg-no-repeat bg-[50%_80%] py-[56px] flex flex-col justify-between px-6 md:px-[80px] lg:px-[120px] xl:px-[160px]"
    >
      <Quote />
      <Clock :province="info.data.countryAbbreviations.capital" :country="info.data.countryAbbreviations.fips" />
      <Info v-if="isInfoOpen" :timezone="info.data.timezoneName" />
    </section>
  </main>
</template>
