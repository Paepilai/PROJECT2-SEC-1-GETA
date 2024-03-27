<script setup>
import { ref, defineProps, onMounted, watchEffect, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const redirectToReceipt = () => {
  router.push({
    path: "/receipt",
    query: {
      chosenDate: chosenDate.value,
      nameValue: nameValue.value,
      emailValue: emailValue.value,
      phoneValue: phoneValue.value,
      specialValue: specialValue.value,
      nightAmount: nightAmount.value,
      calculateTotalAmount: calculateTotalAmount.value,
      selectedCampground: selectedCampground.value,
      qtyAmountTent: qtyAmountTent.value,
      qtyAmountSleepingBag: qtyAmountSleepingBag.value,
      qtyAmountMattress: qtyAmountMattress.value,
      qtyAmountPillow: qtyAmountPillow.value,
      zoneId: zoneId.value,
      zoneName: zoneName.value,
      zoneDesc: zoneDesc.value,
      // tentTotal: calculateTentTotal.value,
      // sleepingBagTotal: calculateSleepingBagTotal.value,
      // mattressTotal: calculateMattressTotal.value,
      // pillowTotal: calculatePillowTotal.value,
    },
  })
}

const chosenDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialValue = ref("")
const selectedCampground = ref(null)

import campData from "../../data/camp.json"

const campground = ref(null)

const qtyAmountTent = ref(0)
const qtyAmountSleepingBag = ref(0)
const qtyAmountMattress = ref(0)
const qtyAmountPillow = ref(0)

const nightAmount = ref(0)

const zoneId = ref(null)
const zoneName = ref(null)
const zoneDesc = ref(null)

onMounted(() => {
  const route = router.currentRoute.value
  chosenDate.value = route.query.chosenDate || null
  const campId = router.currentRoute.value.query.campId
  selectedCampground.value = parseInt(campId)
  zoneId.value = route.query.zoneId || null
  zoneName.value = route.query.zoneName || null
  zoneDesc.value = route.query.zoneDesc || null
})

function getPrice(campId, item) {
  const camp = campData.find((camp) => camp.id === campId)
  return camp ? camp.price[item] : 0
}

const calculateTotalAmount = computed(() => {
  let total = 0

  total +=
    getPrice(selectedCampground.value, "tent") *
    nightAmount.value *
    qtyAmountTent.value
  total +=
    getPrice(selectedCampground.value, "sleeping_bag") *
    nightAmount.value *
    qtyAmountSleepingBag.value
  total +=
    getPrice(selectedCampground.value, "mattress") *
    nightAmount.value *
    qtyAmountMattress.value
  total +=
    getPrice(selectedCampground.value, "pillow") *
    nightAmount.value *
    qtyAmountPillow.value

  return total
})

// const equipmentPrices = computed(() => {
//   const selectedCamp = campData.find(
//     (camp) => camp.id === selectedCampground.value
//   )
//   if (!selectedCamp) return {}

//   return {
//     Tent: selectedCamp.price.tent,
//     "Sleeping Bag": selectedCamp.price.sleeping_bag,
//     Mattress: selectedCamp.price.mattress,
//     Pillow: selectedCamp.price.pillow,
//   }
// })

const calculateTentTotal = computed(() => {
  return (
    getPrice(selectedCampground.value, "tent") *
    nightAmount.value *
    qtyAmountTent.value
  )
})

const calculateSleepingBagTotal = computed(() => {
  return (
    getPrice(selectedCampground.value, "sleeping_bag") *
    nightAmount.value *
    qtyAmountSleepingBag.value
  )
})

const calculateMattressTotal = computed(() => {
  return (
    getPrice(selectedCampground.value, "mattress") *
    nightAmount.value *
    qtyAmountMattress.value
  )
})

const calculatePillowTotal = computed(() => {
  return (
    getPrice(selectedCampground.value, "pillow") *
    nightAmount.value *
    qtyAmountPillow.value
  )
})
</script>

<template>
  <div id="bookInfo">
    <div
      class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        <!-- Date, Nights -->
        {{ chosenDate }}
        <!-- <div v-if="chosenDates.length === 2">
          <p>
            Selected Date Range: {{ chosenDates[0] }} to {{ chosenDates[1] }}
          </p>
          <p>Nights: {{ nights }} night(s)</p>
        </div> -->
        <!-- {{ dateRange[0] }} to {{ dateRange[1] }} ({{ nights }} nights) -->
      </div>

      <!-- <div class="py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="campground">
          Select Campground
        </label>
        <select v-model="selectedCampground">
          <option disabled value="">Please select a campground</option>
          <option v-for="camp in campData" :key="camp.id" :value="camp.id">
            {{ camp.name }}
          </option>
        </select>
      </div> -->

      <div class="mb-4 py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Zone {{ zoneId }} {{ zoneName }}
        </label>
        <h1>{{ zoneDesc }}</h1>

        <label class="block text-gray-700 font-bold mb-2" for="name">
          Nights
        </label>
        <h1><input type="number" v-model="nightAmount" /></h1>
      </div>

      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3 rounded-s-lg">List</th>

              <th scope="col" class="px-6 py-3 rounded-s-lg">Price</th>
              <th scope="col" class="px-6 py-3 rounded-s-lg">Net Price</th>

              <th scope="col" class="px-6 py-3 rounded-s-lg">Qty</th>
              <th scope="col" class="px-6 py-3 rounded-e-lg">Total</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Tent
              </th>

              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "tent") }}
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "tent") * nightAmount }}
              </td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmountTent" />
              </td>
              <td class="px-6 py-4">
                {{
                  getPrice(selectedCampground, "tent") *
                  nightAmount *
                  qtyAmountTent
                }}
              </td>
            </tr>

            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sleeping bag
              </th>

              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "sleeping_bag") }}
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "sleeping_bag") * nightAmount }}
              </td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmountSleepingBag" />
              </td>
              <td class="px-6 py-4">
                {{
                  getPrice(selectedCampground, "sleeping_bag") *
                  nightAmount *
                  qtyAmountSleepingBag
                }}
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Mattress
              </th>

              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "mattress") }}
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "mattress") * nightAmount }}
              </td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmountMattress" />
              </td>
              <td class="px-6 py-4">
                {{
                  getPrice(selectedCampground, "mattress") *
                  nightAmount *
                  qtyAmountMattress
                }}
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Pillow
              </th>

              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "pillow") }}
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "pillow") * nightAmount }}
              </td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmountPillow" />
              </td>
              <td class="px-6 py-4">
                {{
                  getPrice(selectedCampground, "pillow") *
                  nightAmount *
                  qtyAmountPillow
                }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">Total</th>
              <td class="px-6 py-3">{{ nightAmount }}</td>
              <td class="px-6 py-3">{{ calculateTotalAmount }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <div
      class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        User Information
      </div>

      <div class="py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter your name"
          v-model="nameValue"
        />
      </div>

      <div class="py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          v-model="emailValue"
        />
      </div>
      <div class="py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="phone">
          Phone Number
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          v-model="phoneValue"
        />
      </div>

      <div class="mb-4 py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="message">
          Special Requests
        </label>
        <textarea
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="4"
          placeholder="Enter any additional information"
          v-model="specialValue"
        ></textarea>
      </div>
      <div class="flex items-center justify-center mb-4">
        <button
          class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
          type="button"
          @click="redirectToReceipt()"
        >
          Book Camp
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
