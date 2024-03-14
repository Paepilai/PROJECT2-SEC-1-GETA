<template>
  <div>
    <h1 class="text-3xl font-semibold mb-4">{{ campground.name }}</h1>
    <img :src="campground.image" alt="Campground Image" class="w-full h-auto mb-4" />
    <p class="text-gray-600">{{ campground.description }}</p>
    <p class="text-gray-600">Location: {{ campground.location }}</p>
    <p class="text-gray-600">Price: ${{ campground.price }} per night</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import campData from "../../data/camp.json";

const campground = ref(null);

onMounted(() => {
  const id = $route.params.id;
  campground.value = campData.find((camp) => camp.id === parseInt(id));
});
</script>

<style scoped></style>
