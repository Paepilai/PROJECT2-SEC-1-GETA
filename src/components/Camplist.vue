<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <img :src="campground.image" alt="Campground" class="w-full h-40 object-cover" />
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ campground.name }}</h3>
      <p class="text-gray-700 mb-2">{{ campground.location }}</p>
    </div>
  </div>
</template>

<script setup>
// import { PropType } from 'vue';

const props = defineProps({
  campground: {
    type: Object,
    required: true,
  },
});
</script>
