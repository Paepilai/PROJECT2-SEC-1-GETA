<template>
  <div class="border-2 border-gray-200 rounded shadow-lg p-4 flex-col">
    <slot name="location"></slot>
    <h3 class="text-lg font-semibold text-center p-4">{{ name }}</h3>
    <p class="text-gray-600 text-center pr-3 pl-3 pb-4">{{ location }}</p>
    <div class="flex justify-center">
      <router-link :to="{ name: 'CampDetail', params: { id: id } }"
        class="btn bg-[#F79C1D] hover:bg-[#ca7f41] text-white text-center">Explore Camp</router-link>
    </div>
  </div>
</template>

<script setup>
const { title, location } = defineProps({
  name: String,
  location: String,
  id: Number,
});
</script>
