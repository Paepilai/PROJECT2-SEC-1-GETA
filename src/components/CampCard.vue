<template>
  <div class="border border-gray-200 rounded p-4 flex-col">
    <slot name="location"></slot>
    <h3 class="text-lg font-semibold text-center">{{ name }}</h3>
    <p class="text-gray-600 text-center">{{ location }}</p>
    <router-link :to="{ name: 'CampDetail', params: { id: id } }"
      class="btn bg-[#F79C1D] hover:bg-[#ca7f41] text-white text-center">Explore Camp</router-link>
  </div>
</template>

<script setup>
const { title, location } = defineProps({
  name: String,
  location: String,
  id: Number,
});
</script>
