<template>
  <div class="card w-96 h-full bg-base-100 shadow-xl p-5 border">
    <div class="flex justify-end">
      <slot name="option"></slot>
    </div>
    <div class="flex justify-center">
      <slot name="location"></slot>
    </div>
    <div class="pl-2">
      <h3 class="text-lg font-semibold pt-3">📍{{ name }}</h3>
      <p class="text-gray-600">{{ location }}</p>
    </div>
    <div class="card-actions justify-end">
      <router-link :to="{ name: 'CampDetail', params: { id: id } }"
        class="mt-5 btn bg-[#F79C1D] hover:bg-[#F79C1D] hover:ring-2 ring-[#B99B9B] active:bg-[#B99B9B] focus:outline-none">Explore
        Camp</router-link>
    </div>
  </div>
</template>

<script setup>
const { title, location } = defineProps({
  name: String,
  location: String,
  id: [Number, String],
})
</script>