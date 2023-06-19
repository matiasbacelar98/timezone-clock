<script setup>
import { onBeforeMount, ref } from 'vue';

//----- Constants -----//
const defaultQuote = {
  quote:
    'Every prophet has to come from civilization, but every prophet has to go into the wilderness. He must have a strong impression of a complex society and all that it has to give, and then he must serve periods of isolation and meditation. This is the process by which psychic dynamite is made.',
  author: 'Winston Churchill',
};

//----- State -----//
const quote = ref({ data: defaultQuote, reloading: false });

//----- Lifecycle -----//
// Fetch random quote
onBeforeMount(() => {
  getRandomQuote();
});

//----- Utilities -----//
async function getRandomQuote(reload = false) {
  quote.value = { ...quote.value, reloading: reload };

  try {
    const response = await fetch(import.meta.env.VITE_QUOTE_ENDPOINT);

    // If bad request throw error
    if (!response.ok) throw new Error(`Error HTTP: ` + response.status);

    // Success
    const data = await response.json();

    // Wait to avoid flashing
    setTimeout(() => {
      quote.value = { data: { quote: data.quote, author: data.author }, reloading: false };
    }, 400);
  } catch (error) {
    // Wait to avoid flashing
    setTimeout(() => {
      quote.value = { data: defaultQuote, reloading: false };
    }, 400);
  }
}
</script>

<template>
  <article class="flex items-center max-w-[568px] text-white text-base">
    <blockquote v-if="quote.data" class="flex flex-col space-y-6">
      <p>“{{ quote.data.quote }}“</p>
      <cite class="not-italic font-semibold">{{ quote.data.author }}</cite>
    </blockquote>

    <button type="button" @click="getRandomQuote(true)">
      <v-icon class="ml-12" :class="{ 'animate-reloading': quote.reloading }" name="hi-refresh" />
    </button>
  </article>
</template>
