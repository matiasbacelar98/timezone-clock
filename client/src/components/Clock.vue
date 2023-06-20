<script setup>
const props = defineProps({
  province: String,
  country: String,
});
</script>

<template>
  <article class="text-white md:flex md:justify-between mt-4">
    <div>
      <div class="space-x-3">
        <v-icon name="ri-moon-fill" />
        <!-- <v-icon name="md-wbsunny-round" /> -->
        <span class="uppercase sm:text-[18px]">Good night, it’s currently</span>
      </div>

      <div class="font-semibold text-[96px] uppercase sm:tracking-[0.08em] sm:text-[128px]">10:35</div>

      <span class="uppercase tracking-[0.08em] font-medium sm:text-[18px]">in {{ props.province }}, {{ props.country }}</span>
    </div>

    <button
      class="flex items-center justify-between w-[105px] h-[42px] bg-white text-gray-dark rounded-[40px] py-2 pl-4 pr-1 mt-10 md:mt-0 md:self-end"
    >
      <span class="font-medium text-sm uppercase tracking-[0.08em]">more</span>
      <span class="flex items-center justify-center w-[30px] h-[30px] text-white bg-gray-dark rounded-[50%]">
        <!-- <v-icon name="md-keyboardarrowup" /> -->
        <v-icon name="md-keyboardarrowdown-twotone" />
      </span>
    </button>
  </article>
</template>
