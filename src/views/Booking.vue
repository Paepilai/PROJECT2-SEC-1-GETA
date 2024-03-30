<script setup>
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router"
import campData from "../../data/camp.json"
const router = useRouter()
const zoneId = router.currentRoute.value.query.zoneId
const zoneName = router.currentRoute.value.query.zoneName
const selectedZone = router.currentRoute.value.query.campId

const checkinDate = ref(null)
const checkoutDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialRequests = ref("")

const calculateNightsAndTotal = () => {
  const nights = numberOfNights.value
  const price = CampgroundPrice.value
  totalPrice.value = nights && price ? nights * price : 0
}
watch([checkinDate, checkoutDate], () => {
  calculateNightsAndTotal()
})

const getPrice = (campId, item) => {
  const camp = campData.find((camp) => camp.id === parseInt(campId))
  return camp ? camp.price[item] : 0
}

const today = new Date().toISOString().split("T")[0]
const minCheckinDate = computed(() => today)

const minCheckoutDate = computed(() => {
  const minDate = new Date(checkinDate.value)
  minDate.setDate(minDate.getDate() + 1)
  return minDate.toISOString().split("T")[0]
})

const numberOfNights = computed(() => {
  if (!checkinDate.value || !checkoutDate.value) return 0
  const startDate = new Date(checkinDate.value)
  const endDate = new Date(checkoutDate.value)
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime())
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24))
  return numberOfNights
})

const CampgroundPrice = computed(() => {
  return selectedZone ? getPrice(selectedZone, "Campground") : 0
})

const totalPrice = ref(0)

const updateCheckoutMinDate = () => {
  checkoutDate.value = null
}

const submitBooking = () => {
  const bookingData = {
    checkinDate: checkinDate.value,
    checkoutDate: checkoutDate.value,
    nameValue: nameValue.value,
    emailValue: emailValue.value,
    phoneValue: phoneValue.value,
    specialRequests: specialRequests.value,
    numberOfNights: numberOfNights.value,
    totalPrice: totalPrice.value,
  }

  router.push({
    path: "/receipt",
    query: bookingData,
  })
}

const qtyAmountTent = ref(0)
const qtyAmountSleepingBag = ref(0)
const qtyAmountMattress = ref(0)
const qtyAmountPillow = ref(0)

const calculateTotalAmount = computed(() => {
  let total = 0

  total += getPrice(selectedZone, "sleeping_bag") * qtyAmountSleepingBag.value
  total += getPrice(selectedZone, "mattress") * qtyAmountMattress.value
  total += getPrice(selectedZone, "pillow") * qtyAmountPillow.value

  return total
})

const sumAllTotal = computed(() => {
  let sum = 0

  sum += calculateTotalAmount.value
  sum += totalPrice.value
  return sum
})

const sumQuantities = computed(() => {
  let sum = 0

  sum += qtyAmountSleepingBag.value
  sum += qtyAmountMattress.value
  sum += qtyAmountPillow.value
  return sum
})

import { useBookingStore } from "../store/BookingStore.js"

const bookingStore = useBookingStore()
</script>

<template>
  <div id="bookInfo">
    <div
      class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        Zone {{ zoneId }} {{ zoneName }}
      </div>

      <div class="-mb-2 py-4 px-6">
        <label for="checkin">Check-in Date:</label>
        <input
          type="date"
          id="checkin"
          v-model="checkinDate"
          :min="minCheckinDate"
          @input="updateCheckoutMinDate"
        />
      </div>
      <div class="mb-6 px-6">
        <label for="checkout">Check-out Date:</label>
        <input
          type="date"
          id="checkout"
          v-model="checkoutDate"
          :min="minCheckoutDate"
        />
      </div>
      <div class="mb-4 px-6">Total Nights: {{ numberOfNights }}</div>

      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3 rounded-s-lg">List</th>
              <th scope="col" class="px-6 py-3 rounded-s-lg">Qty</th>

              <th scope="col" class="px-6 py-3 rounded-s-lg">Price</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800">
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Sleeping bag
              </th>
              <td class="px-6 py-4">
                <input type="number" v-model="qtyAmountSleepingBag" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedZone, "sleeping_bag") }}
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
                <input type="number" v-model="qtyAmountMattress" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedZone, "mattress") }}
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
                <input type="number" v-model="qtyAmountPillow" />
              </td>
              <td class="px-6 py-4">
                {{ getPrice(selectedZone, "pillow") }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">
                Total Equipments Price
              </th>

              <td class="px-6 py-3">{{ sumQuantities }}</td>
              <td class="px-6 py-3">{{ calculateTotalAmount }}</td>
            </tr>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">
                Total Nights Price
              </th>

              <td class="px-6 py-3">{{ numberOfNights }}</td>
              <td class="px-6 py-3">{{ totalPrice }}</td>
            </tr>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">All Total</th>

              <td class="px-6 py-3"></td>
              <td class="px-6 py-3">{{ sumAllTotal }}</td>
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
          v-model="specialRequests"
        ></textarea>
      </div>
      <div class="flex items-center justify-center mb-4">
        <button
          class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
          type="button"
          @click="submitBooking"
        >
          Book Camp
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
