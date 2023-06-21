<script setup>
import { ref } from 'vue';
import Info from '../components/Info.vue';
import Clock from '../components/Clock.vue';
import Quote from '../components/Quote.vue';
import Toggle from '../components/Toggle.vue';

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
  isOpen: false,
});

//----- Lifecycle -----//
// onBeforeMount(() => {
//   getTimezoneInfo();
// });

//----- Utilities -----//
function toggleInfo() {
  info.value.isOpen = !info.value.isOpen;
}
</script>

<template>
  <main
    class="font-poppins min-h-screen bg-[url(../assets/img/afternoon.jpg)] bg-cover bg-no-repeat bg-[50%_80%] py-[56px] flex flex-col px-6 justify-between md:px-[80px] lg:px-[120px] xl:px-[160px]"
    :class="{ relative: info.isOpen }"
  >
    <Quote v-if="!info.isOpen" />

    <section class="md:flex md:justify-between mt-4">
      <Clock :province="info?.data?.countryAbbreviations?.capital" :country="info?.data?.countryAbbreviations?.fips" />

      <button class="mt-10 md:mt-0 md:self-end" @click="toggleInfo">
        <Toggle :isOpen="info.isOpen" />
      </button>
    </section>

    <Info v-if="info.isOpen" :timezone="info?.data?.timezoneName" />
  </main>
</template>
