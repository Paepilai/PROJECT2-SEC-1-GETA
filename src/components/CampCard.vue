<template>
  <div class="border border-gray-200 rounded p-4">
    <slot name="location"></slot>
    <h3 class="text-lg font-semibold">{{ name }}</h3>
    <p class="text-gray-600">{{ location }}</p>
    <router-link
      :to="{ name: 'CampDetail', params: { id: id } }"
      class="mt-2 block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >Explore Camp</router-link
    >
  </div>
</template>

<script setup>
const { title, location } = defineProps({
  name: String,
  location: String,
  id: Number,
});
</script>
