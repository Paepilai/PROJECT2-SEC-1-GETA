<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { saveBooking } from "../../libs/BookingFetch.js"

const booking = ref(null)
const route = useRoute()
const router = useRouter()

const campgroundName = route.query.campgroundName

onMounted(() => {
  const routeQuery = route.query
  if (routeQuery) {
    booking.value = {
      checkinDate: routeQuery.checkinDate,
      checkoutDate: routeQuery.checkoutDate,
      name: routeQuery.nameValue,
      email: routeQuery.emailValue,
      phone: routeQuery.phoneValue,
      specialRequests: routeQuery.specialRequests,
      numberOfNights: routeQuery.numberOfNights,
      totalPrice: routeQuery.totalPrice,
      campgroundName: campgroundName,
      zoneId: routeQuery.zoneId,
      zoneName: routeQuery.zoneName,
    }
    saveBooking(booking.value)
    console.log("Campground Name:", campgroundName)
  }
})

const submitReceipt = () => {
  router.push("/mybooking")
}
</script>

<template>
  <div>
    <template v-if="booking">
      <div
        class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden text-black mb-6"
      >
        <div class="flex flex-col justify-center items-center gap-2">
          <h4 class="font-semibold text-4xl">{{ campgroundName }}</h4>
        </div>
        <div class="flex flex-col gap-3 border-b py-6 text-xl px-10">
          <p class="flex justify-between">
            <span class="text-gray-400">Check-in Date:</span>
            <span>{{ $route.query.checkinDate }}</span>
          </p>
          <p class="flex justify-between">
            <span class="text-gray-400">Check-out Date:</span>
            <span>{{ $route.query.checkoutDate }}</span>
          </p>

          <p class="flex justify-between">
            <span class="text-gray-400">Zone:</span>
            <span>{{ $route.query.zoneId }} {{ $route.query.zoneName }}</span>
          </p>

          <p class="flex justify-between">
            <span class="text-gray-400">Nights:</span>
            <span>{{ $route.query.numberOfNights }}</span>
          </p>
          <p class="flex justify-between">
            <span class="text-gray-400">Customer:</span>
            <span>{{ $route.query.nameValue }}</span>
          </p>
          <p class="flex justify-between">
            <span class="text-gray-400">Email:</span>
            <span> {{ $route.query.emailValue }}</span>
          </p>
          <p class="flex justify-between">
            <span class="text-gray-400">Phone Number:</span>
            <span> {{ $route.query.phoneValue }}</span>
          </p>
          <p class="flex justify-between">
            <span class="text-gray-400">Special Requests:</span>
            <span>{{ $route.query.specialRequests }}</span>
          </p>
        </div>
        <div class="flex flex-col gap-3 pb-6 pt-2 text-xl px-10">
          <table class="w-full text-left">
            <thead>
              <tr class="flex">
                <th class="w-full py-2">List</th>
                <th class="min-w-[44px] py-2 px-28">QTY</th>
                <th class="min-w-[44px] py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr class="flex">
                <td class="flex-1">Sleeping bag</td>
                <td class="min-w-[44px] py-2 px-28">
                  {{ $route.query.sleepingBagQty }}
                </td>
                <td class="min-w-[44px]"></td>
              </tr>
              <tr class="flex">
                <td class="flex-1">Mattress</td>
                <td class="min-w-[44px] py-2 px-28">
                  {{ $route.query.mattressQty }}
                </td>
                <td class="min-w-[44px]"></td>
              </tr>
              <tr class="flex">
                <td class="flex-1">Pillow</td>
                <td class="min-w-[44px] py-2 px-28">
                  {{ $route.query.pillowQty }}
                </td>
                <td class="min-w-[44px]"></td>
              </tr>
              <tr class="flex">
                <td class="flex-1">All Total</td>
                <td class="min-w-[44px] py-2 px-28"></td>
                <td class="min-w-[44px]">{{ $route.query.totalPrice }}</td>
              </tr>
            </tbody>
          </table>

          <div class="py-4 justify-center items-center flex flex-col gap-2">
            <button
              class="font-bold bg-[#E6BB96] text-gray-800 py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
              type="submit"
              @click="submitReceipt"
            >
              My Booking
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<style scoped></style>
