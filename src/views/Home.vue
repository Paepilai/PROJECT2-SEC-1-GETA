<script setup>
import campData from "../../data/camp.json"
import CampCard from "../components/CampCard.vue"
import ListCard from "../components/ListCard.vue"
import { ref, onMounted, computed } from "vue"
import { myUserTodo } from "../stores/users"

const campgrounds = ref([])
const searchQuery = ref("")
const myUser = myUserTodo()
const userName = myUser.getTodos()
const name = ref(userName[0].name)

onMounted(async () => {
  try {
    const response = await fetch(import.meta.env.VITE_CAMP_BASE_URL)
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = await response.json()
    campgrounds.value = data
  } catch (error) {
    console.error(error)
  }
})

const filtercamp = computed(() => {
  return campgrounds.value.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})
</script>

<template>
  <div class="py-6">
    <div class="grid-container">
      <div class="flex items-center justify-between px-3 py-5">
        <h1 class="ml-8 text-4xl font-bold">
          Hi {{ name }}, Welcome to your space!
        </h1>
        <div id="app">
          <label
            class="mr-8 input input-bordered- flex items-center gap-2 text-black"
          >
            <input
              type="text"
              v-model="searchQuery"
              class="grow"
              placeholder="Search"
            />
          </label>
        </div>
      </div>
      <h1 class="ml-9 text-3xl font-bold">Campgrounds</h1>
    </div>
    <div class="text-gray-900">
      <ListCard :items="filtercamp">
        <template #default="slotProps">
          <div
            class="transition-transform duration-300 hover:scale-105 shadow-lg cursor-pointer"
          >
            <CampCard
              :name="slotProps.item.name"
              :location="slotProps.item.location"
              :id="slotProps.item.id"
            >
              <template v-slot:location>
                <img
                  :src="slotProps.item.image"
                  alt="Location Image"
                  class="h-60 w-80 object-cover rounded-t transition-transform transform hover:scale-105"
                  style="box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1)"
                />
              </template>
            </CampCard>
          </div>
        </template>
      </ListCard>
    </div>
  </div>
</template>

<style scoped>
.transition-transform {
  transition-property: transform;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
