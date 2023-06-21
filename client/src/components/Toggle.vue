<script setup>
const props = defineProps({ isOpen: String });
</script>

<template>
  <div class="flex items-center justify-between w-[105px] h-[42px] bg-white text-gray-dark rounded-[40px] py-2 pl-4 pr-1">
    <span class="font-medium text-sm uppercase tracking-[0.08em]">{{ props.isOpen ? 'less' : 'more' }}</span>
    <span class="flex items-center justify-center w-[30px] h-[30px] text-white bg-gray-dark rounded-[50%]">
      <v-icon v-if="!props.isOpen" name="md-keyboardarrowdown-twotone" />
      <v-icon v-else name="md-keyboardarrowup" />
    </span>
  </div>
</template>
