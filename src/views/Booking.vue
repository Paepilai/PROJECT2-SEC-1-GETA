<template>
  <div id="bookInfo">
    <div class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Booking Details -->
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        Booking
      </div>

      <div class="mb-4 py-4 px-6">
        <!-- Zone Information -->
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Zone {{ zoneId }} {{ zoneName }}
        </label>
        <h1>{{ zoneDesc }}</h1>

        <!-- Check-in and Check-out Date Pickers -->
        <div class="flex justify-between">
          <div>
            <label class="block text-gray-700 font-bold mb-2" for="checkin"
              >Check-in Date</label
            >
            <input
              type="date"
              v-model="checkinDate"
              id="checkin"
              @change="calculateNightsAndTotal"
            />
          </div>
          <div>
            <label class="block text-gray-700 font-bold mb-2" for="checkout"
              >Check-out Date</label
            >
            <input
              type="date"
              v-model="checkoutDate"
              id="checkout"
              @change="calculateNightsAndTotal"
            />
          </div>
        </div>

        <!-- Nights -->
        <label class="block text-gray-700 font-bold mb-2" for="nightAmount">
          Total Nights
        </label>
        <h1>{{ nightAmount }}</h1>
      </div>

      <!-- Campground Details -->
      <div class="relative overflow-x-auto">
        <!-- Table -->
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <!-- Table Headers -->
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
          <!-- Table Body -->
          <tbody class="bg-white dark:bg-gray-800">
            <tr>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Campground
              </th>
              <td class="px-6 py-4">{{ getPrice(selectedCampground, "Campground") }}</td>
              <td class="px-6 py-4">
                {{ getPrice(selectedCampground, "Campground") * nightAmount }}
              </td>
              <td class="px-6 py-4"></td>
              <td class="px-6 py-4">{{ calculateTotalAmount }}</td>
            </tr>
          </tbody>
          <!-- Table Footer -->
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">Total</th>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3"></td>
              <td class="px-6 py-3">{{ calculateTotalAmount }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <!-- User Information -->
    <div class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        User Information
      </div>
      <!-- User Inputs -->
      <div class="py-4 px-6">
        <!-- Name -->
        <label class="block text-gray-700 font-bold mb-2" for="name"> Name </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter your name"
          v-model="nameValue"
        />
      </div>
      <div class="py-4 px-6">
        <!-- Email -->
        <label class="block text-gray-700 font-bold mb-2" for="email"> Email </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          v-model="emailValue"
        />
      </div>
      <div class="py-4 px-6">
        <!-- Phone Number -->
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
        <!-- Special Requests -->
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
        <!-- Book Button -->
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

<script setup>
import { ref, defineProps, onMounted, watchEffect, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Data
const chosenDate = ref(null);
const nameValue = ref("");
const emailValue = ref("");
const phoneValue = ref("");
const specialValue = ref("");
const selectedCampground = ref(null);
const nightAmount = ref(0);
const checkinDate = ref(null);
const checkoutDate = ref(null);

import campData from "../../data/camp.json";

// Methods
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
      zoneId: zoneId.value,
      zoneName: zoneName.value,
      zoneDesc: zoneDesc.value,
    },
  });
};

function getPrice(campId, item) {
  const camp = campData.find((camp) => camp.id === campId);
  return camp ? camp.price[item] : 0;
}

const calculateTotalAmount = computed(() => {
  if (selectedCampground.value) {
    const campgroundPrice = getPrice(selectedCampground.value, "Campground");
    return nightAmount.value * campgroundPrice;
  } else {
    return 0;
  }
});

const calculateCampgroundTotal = computed(() => {
  if (selectedCampground.value) {
    return nightAmount.value * getPrice(selectedCampground.value, "Campground");
  } else {
    return 0;
  }
});

// Watchers
watchEffect(() => {
  calculateNightsAndTotal();
});

// Methods
function calculateNightsAndTotal() {
  if (checkinDate.value && checkoutDate.value) {
    const checkin = new Date(checkinDate.value);
    const checkout = new Date(checkoutDate.value);
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((checkout - checkin) / oneDay));
    nightAmount.value = diffDays;
  }
}
</script>

<style scoped></style>
