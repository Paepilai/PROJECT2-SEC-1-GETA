<template>
  <div class="grid grid-cols-3 gap-1 pb-20" v-if="campground">
    <div class="col-span-2">
      <div class="flex-col">
        <div class=" font-bold text-4xl p-10 text-center inline flex-row ">
          <RouterLink to="/" class="btn btn-circle text-bold">
            < </RouterLink>
              <h1>{{ campground.name }}</h1>
        </div>
        <div>
          <img :src="campground.image" class="rounded-lg max-w-3xl justify-center mx-auto">
        </div>
      </div>
    </div>

    <div class="col-start-3 border-2 rounded-md shadow-md m-5 h-auto">
      <div class="font-bold text-3xl p-10 text-center ">
        <h3>Camp Details</h3>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="font-bold text-2xl p-5 text-center">
        <h3>Description</h3>
      </div>
      <div class="text-xl pl-10 pr-10 pb-5 text-center">
        <p>{{ campground.description }}</p>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="font-bold text-2xl p-5 text-center">
        <h3>Location</h3>
      </div>
      <div class="text-xl pl-10 pr-10 pb-5 text-center">
        <p>{{ campground.location }}</p>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="font-bold text-2xl p-5 text-center ">
        <h3>Price</h3>
      </div>
      <div class="text-xl pl-10 pr-10 pb-5 text-center">
        <p>{{ campground.price }}
        </p>
      </div>
      <hr class="h-2 border-dashed border-gray-300 ">
      <div class="flex justify-center p-5 ">
        <RouterLink to="/" class="btn bg-[#F79C1D] hover:bg-[#F79C1D] text-white text-2xl">Join Camp</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import campData from "../../data/camp.json"

const route = useRoute()
const campground = ref(null)

onMounted(() => {
  const id = route.params.id
  campground.value = campData.find((camp) => camp.id === parseInt(id))
})
</script>

<style scoped></style>
