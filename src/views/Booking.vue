<script setup>
import { ref, defineProps, onMounted, watchEffect, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// const redirectToReceipt = () => {
//   console.log("Routing..")
//   router.push("/receipt")
// }

const redirectToReceipt = () => {
  router.push({
    path: "/receipt",
    query: {
      chosenDate: chosenDate.value,
      nameValue: nameValue.value,
      emailValue: emailValue.value,
      phoneValue: phoneValue.value,
      specialValue: specialValue.value,
      totalPrice: calculateTotalPrice(),
    },
  })
}

const chosenDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialValue = ref("")

import campData from "../../data/old-camp.json"

const campground = ref(null)

const qtyAmount = ref(0)
const nightAmount = ref(0)
const totalPrices = ref([])

onMounted(() => {
  const route = router.currentRoute.value
  chosenDate.value = route.query.chosenDate || null
})

// Function to fetch price from campData
// function getPrice(campId) {
//   const camp = campData.find((camp) => camp.id === campId)
//   return camp ? camp.price : 0
// }

function getPrice(campId, item) {
  const camp = campData.find((camp) => camp.id === campId)
  return camp ? camp.price[item] : 0
}

// const calculateTotalAmount = computed(() => {
//   let total = 0

//   // Calculate total for each item
//   total += getPrice(1) * nightAmount.value * qtyAmount.value // Tent
//   total += getPrice(2) * nightAmount.value * qtyAmount.value // Sleeping bag
//   total += getPrice(3) * nightAmount.value * qtyAmount.value // Mattress
//   total += getPrice(4) * nightAmount.value * qtyAmount.value // Pillow
//   total += getPrice(5) * nightAmount.value * qtyAmount.value // Blanket

//   return total
// })
// const calculateTotalAmount = computed(() => {
//   let total = 0

//   // Calculate total for each item
//   total += getPrice(1, "tent") * nightAmount.value * qtyAmount.value // Tent
//   total += getPrice(1, "sleeping_bag") * nightAmount.value * qtyAmount.value // Sleeping bag
//   total += getPrice(1, "mattress") * nightAmount.value * qtyAmount.value // Mattress
//   total += getPrice(1, "pillow") * nightAmount.value * qtyAmount.value // Pillow

//   return total
// })

const calculateTotalAmount = computed(() => {
  let total = 0
  const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9] // IDs for which you want to calculate the total amount

  // Iterate over each ID
  ids.forEach((id) => {
    // Calculate total for each item for the current ID
    total += getPrice(id, "tent") * nightAmount.value * qtyAmount.value // Tent
    total += getPrice(id, "sleeping_bag") * nightAmount.value * qtyAmount.value // Sleeping bag
    total += getPrice(id, "mattress") * nightAmount.value * qtyAmount.value // Mattress
    total += getPrice(id, "pillow") * nightAmount.value * qtyAmount.value // Pillow
    // Add more lines for additional items if needed
  })

  return total
})
</script>

<template>
  <div id="bookInfo">
    <div
      class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
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

      <div class="mb-4 py-4 px-6">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Living Details
        </label>
        <h1>dff</h1>

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
              <th scope="col" class="px-6 py-3 rounded-s-lg">Night</th>
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
                {{ nightAmount }}
              </td>
              <td class="px-6 py-4">{{ getPrice(2, "tent") }}</td>
              <td class="px-6 py-4">{{ getPrice(2, "tent") * nightAmount }}</td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmount" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(2, "tent") * nightAmount * qtyAmount }}
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
                {{ nightAmount }}
              </td>
              <td class="px-6 py-4">{{ getPrice(1, "pillow") }}</td>
              <td class="px-6 py-4">
                {{ getPrice(1, "pillow") * nightAmount }}
              </td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmount" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(1, "pillow") * nightAmount * qtyAmount }}
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
                {{ nightAmount }}
              </td>
              <td class="px-6 py-4">{{ getPrice(1) }}</td>
              <td class="px-6 py-4">{{ getPrice(1) * nightAmount }}</td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmount" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(1) * nightAmount * qtyAmount }}
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
                {{ nightAmount }}
              </td>
              <td class="px-6 py-4">{{ getPrice(1) }}</td>
              <td class="px-6 py-4">{{ getPrice(1) * nightAmount }}</td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmount" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(1) * nightAmount * qtyAmount }}
              </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Blanket
              </th>
              <td class="px-6 py-4">
                {{ nightAmount }}
              </td>
              <td class="px-6 py-4">{{ getPrice(1) }}</td>
              <td class="px-6 py-4">{{ getPrice(1) * nightAmount }}</td>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmount" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(1) * nightAmount * qtyAmount }}
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
      class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
      >
        User Information
      </div>
      <form class="py-4 px-6" action="" method="POST">
        <div class="mb-4">
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
        <h1>Contact Information</h1>
        <div class="mb-4">
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
        <div class="mb-4">
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

        <div class="mb-4">
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
            class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="button"
            @click="redirectToReceipt()"
          >
            Book Camp
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
