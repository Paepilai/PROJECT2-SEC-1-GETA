<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import campData from "../../data/camp.json";
import { myUserTodo } from "../stores/users";

const router = useRouter();
const zoneId = router.currentRoute.value.query.zoneId;
const zoneName = router.currentRoute.value.query.zoneName;
const selectedZone = router.currentRoute.value.query.campId;
const campgroundName = router.currentRoute.value.query.campgroundName;

const checkinDate = ref(null);
const checkoutDate = ref(null);
const nameValue = ref("");
const emailValue = ref("");
const phoneValue = ref("");
const specialRequests = ref("");
const qtyAmountSleepingBag = ref(0);
const qtyAmountMattress = ref(0);
const qtyAmountPillow = ref(0);

const myUser = myUserTodo();
const user = myUser.getTodos();
const bookingUser = ref(user[0]);

nameValue.value = bookingUser.value.name;
emailValue.value = bookingUser.value.email;
phoneValue.value = bookingUser.value.phone;

const calculateNightsAndTotal = () => {
  const nights = numberOfNights.value;
  const price = CampgroundPrice.value;
  totalPrice.value = nights && price ? nights * price : 0;
};

const getPrice = (campId, item) => {
  const camp = campData.camp.find((camp) => camp.id === parseInt(campId));
  return camp ? camp.price[item] : 0;
};

watch([checkinDate, checkoutDate], () => {
  calculateNightsAndTotal();
});

const today = new Date().toISOString().split("T")[0];
const minCheckinDate = computed(() => today);

const minCheckoutDate = computed(() => {
  const minDate = new Date(checkinDate.value);
  minDate.setDate(minDate.getDate() + 1);
  return minDate.toISOString().split("T")[0];
});

const numberOfNights = computed(() => {
  if (!checkinDate.value || !checkoutDate.value) return 0;
  const startDate = new Date(checkinDate.value);
  const endDate = new Date(checkoutDate.value);
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return numberOfNights;
});

const CampgroundPrice = computed(() => {
  return selectedZone ? getPrice(selectedZone, "Campground") : 0;
});

const totalPrice = ref(0);

const updateCheckoutMinDate = () => {
  checkoutDate.value = null;
};

const submitBooking = () => {
  if (!isFormValid.value) {
    return;
  }

  const bookingData = {
    checkinDate: checkinDate.value,
    checkoutDate: checkoutDate.value,
    nameValue: nameValue.value,
    emailValue: emailValue.value,
    phoneValue: phoneValue.value,
    specialRequests: specialRequests.value,
    numberOfNights: numberOfNights.value,
    zoneId: zoneId,
    zoneName: zoneName,
    totalPrice: sumAllTotal.value,
    equipmentPrice: calculateTotalAmount.value,
    sleepingBagQty: qtyAmountSleepingBag.value,
    mattressQty: qtyAmountMattress.value,
    pillowQty: qtyAmountPillow.value,
    campgroundName: campgroundName,
  };

  router.push({
    path: "/receipt",
    query: bookingData,
  });
};

const validateInput = (item) => {
  switch (item) {
    case "sleepingBag":
      if (qtyAmountSleepingBag.value < 0) {
        qtyAmountSleepingBag.value = 0;
      }
      break;
    case "mattress":
      if (qtyAmountMattress.value < 0) {
        qtyAmountMattress.value = 0;
      }
      break;
    case "pillow":
      if (qtyAmountPillow.value < 0) {
        qtyAmountPillow.value = 0;
      }
      break;
    default:
      break;
  }
};

const calculateTotalAmount = computed(() => {
  let total = 0;

  total += getPrice(selectedZone, "sleeping_bag") * qtyAmountSleepingBag.value;
  total += getPrice(selectedZone, "mattress") * qtyAmountMattress.value;
  total += getPrice(selectedZone, "pillow") * qtyAmountPillow.value;

  return total;
});

const sumAllTotal = computed(() => {
  let sum = 0;

  sum += calculateTotalAmount.value;
  sum += totalPrice.value;
  return sum;
});

const sumQuantities = computed(() => {
  let sum = 0;

  sum += qtyAmountSleepingBag.value;
  sum += qtyAmountMattress.value;
  sum += qtyAmountPillow.value;
  return sum;
});

const isFormValid = computed(() => {
  return (
    checkinDate.value &&
    checkoutDate.value &&
    nameValue.value &&
    emailValue.value &&
    phoneValue.value
  );
});
</script>
<template>
  <div id="bookInfo py-6">
    <div class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        {{ campgroundName }}
      </div>
      <div class="text-gray-800 font-bold">
        <div class="mt-4 mb-2 px-6">Zone: {{ zoneName }}</div>

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
        <span v-if="!checkinDate || !checkoutDate" class="text-red-500 ml-6"
          >Please choose check-in and check-out date</span
        >
      </div>
      <div class="relative overflow-x-auto">
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        ></table>
      </div>
      <div class="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div
          class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
        >
          User Information
        </div>
        <div class="py-4 px-6">
          <label class="block text-gray-700 font-bold mb-2" for="name"> Name </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter your name"
            v-model="nameValue"
          />
          <span v-if="!nameValue" class="text-red-500">Please enter your name</span>
        </div>

        <div class="py-4 px-6">
          <label class="block text-gray-700 font-bold mb-2" for="email"> Email </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
            v-model="emailValue"
          />
          <span v-if="!emailValue" class="text-red-500">Please enter your email</span>
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
          <span v-if="!phoneValue" class="text-red-500"
            >Please enter your phone number.</span
          >
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
            :disabled="!isFormValid"
            class="cursor-pointer bg-[#E6BB96] hover:text-white font-bold text-gray-800 py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
            type="button"
            @click="submitBooking"
          >
            Book Camp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
