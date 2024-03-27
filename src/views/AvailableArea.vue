<script setup>
import { ref } from "vue"

const chosenDate = ref(null)
import { useRouter } from "vue-router"
import campData from "../../data/camp.json"

const router = useRouter()

const redirectToBooking = (zone) => {
  console.log("Routing..")
  const campId = router.currentRoute.value.query.campId

  router.push({
    path: "/booking",
    query: {
      chosenDate: chosenDate.value,
      campId: campId,
      zoneId: zone.zoneId,
      zoneName: zone.zoneName,
      zoneDesc: zone.zoneDesc,
    },
  })
}
const campground = campData[0]
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
    v-show="chosenDate === '2024-03-16'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>

  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-01'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-02'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-03'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-04'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-05'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-06'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-07'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-08'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-09'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
  <div
    class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    id="availableRest1"
    v-show="chosenDate === '2024-04-10'"
    v-for="(zone, index) in campground.area"
    :key="index"
  >
    <div
      class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
    >
      Zone {{ zone.zoneId }}
    </div>
    <div class="py-4 px-6">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          {{ zone.zoneName }}
        </label>
        <h1>{{ zone.zoneDesc }}</h1>
      </div>
      <button
        class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
        @click="redirectToBooking(zone)"
      >
        Book
      </button>
    </div>
  </div>
</template>

<style scoped></style>
