<script setup>
import { ref } from "vue"

const chosenDate = ref(null)
import { useRouter } from "vue-router"

const router = useRouter()

const redirectToBooking = () => {
  console.log("Routing..")
  router.push({
    path: "/booking",
    query: { chosenDate: chosenDate.value },
  })
}
</script>

<template>
  <label class="block text-gray-700 font-bold mb-2" for="date1">
    Check-in
  </label>
  <input
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="date"
    type="date"
    placeholder="Select a date"
    v-model="chosenDate"
  />
  <!-- <label class="block text-gray-700 font-bold mb-2" for="date2">
    Check-out
  </label>
  <input
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    id="date"
    type="date"
    placeholder="Select a date"
    v-model="chosenDate2"
  /> -->

  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-03-16' && !availableRest"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone 1
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          โซนที่ทำการอุทยานแห่งชาติ
        </label>
        <h1>บริการบ้านพัก ห้องประชุม เต็นท์ ลานกางเต็นท์</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking()"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-03-16' && !availableRest"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone 2
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          โซนริมแก่ง
        </label>
        <h1>ห่างจากที่ทำการ 1.5 กม. ใกล้สะพานแขวน บริการบ้านพัก</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking()"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-03-16' && !availableRest"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone 3
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          โซนหน่วยพิทักษ์ฯ บ้านกร่าง
        </label>
        <h1>ห่างจากที่ทำการฯ 35 กม. บริการค่ายพักแรม เต็นท์ ลานกางเต็นท์</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking()"
      >
        Book
      </button>
    </div>
  </div>
</template>

<style scoped></style>
