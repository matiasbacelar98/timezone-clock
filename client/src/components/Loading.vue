<script setup>
import { SwappingSquaresSpinner } from 'epic-spinners';
</script>

<template>
  <main class="min-h-screen py-[56px] px-6 md:px-[80px] lg:px-[120px] xl:px-[160px] grid place-content-center bg-black">
    <swapping-squares-spinner :animation-duration="1000" :size="65" color="#FEFEFE" />
  </main>
</template>
