<script setup>
import campData from "../../data/camp.json";
import Camplist from "../components/Navbar.vue";
import CampCard from "../components/CampCard.vue";
import ListCard from "../components/ListCard.vue";
import { ref, onMounted } from "vue";
const campgrounds = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/data/camp.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    campgrounds.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div class="grid-container">
    <div class="flex items-center justify-between px-3 py-5">
      <h1 class="ml-8 text-4xl font-bold">Hi [Name], welcome to your space!</h1>

      <label class="mr-8 input input-bordered- flex items-center gap-2">
        <input type="text" class="grow" placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70">
          <path fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd" />
        </svg>
      </label>
    </div>
    <h1 class="ml-9 text-3xl font-bold">Campgrounds</h1>
  </div>
  <div>
    <ListCard :items="campgrounds">
      <template #default="slotProps">
        <CampCard
          :name="slotProps.item.name"
          :location="slotProps.item.location"
          :id="slotProps.item.id"
        >
          :
          <template v-slot:location>
            <img
              :src="slotProps.item.image"
              alt="Location Image"
              class="h-60 w-80 object-cover rounded-t"
            />
          </template>
        </CampCard>
      </template>
    </ListCard>
  </div>
</template>

<style scoped></style>
