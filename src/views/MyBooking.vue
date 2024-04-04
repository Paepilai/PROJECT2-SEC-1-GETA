<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchBookings, deleteBooking, fetchCampgrounds } from "../libs/BookingFetch.js";

const router = useRouter();
const isLoading = ref(false);
const bookings = ref([]);
const campgrounds = ref([]);

const fetchData = async () => {
  try {
    isLoading.value = true;
    bookings.value = await fetchBookings();
    campgrounds.value = await fetchCampgrounds();
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

const deleteHandler = async (id, index) => {
  try {
    await deleteBooking(id);
    bookings.value.splice(index, 1);
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
};

const getCampgroundImage = (campgroundName) => {
  const campground = campgrounds.value.find((camp) => camp.name === campgroundName);
  return campground && campground.image ? campground.image : "placeholder.jpg";
};
</script>
<template>
  <div class="py-2">
    <div class="max-w-2xl mx-auto mt-10 rounded-lg">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="">
        <div v-if="bookings.length === 0" class="text-center font-bold text-3xl mt-20">
          No bookings
        </div>

        <div
          v-for="(booking, index) in bookings"
          :key="index"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto mt-10"
        >
          <img
            :src="getCampgroundImage(booking.campgroundName)"
            alt="Campground Image"
            class="object-cover w-full rounded-t-lg h-96 md:h-100 md:w-60 md:rounded-none md:rounded-s-lg"
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <div class="py-4">
              <h5
                class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
              >
                {{ booking.campgroundName }}
              </h5>
              <div class="text-gray-800 font-semibold">
                <h2>Booking Number: {{ booking.id }}</h2>
                <p>Campground: {{ booking.campgroundName }}</p>
                <p>Check-in Date: {{ booking.checkinDate }}</p>
                <p>Check-out Date: {{ booking.checkoutDate }}</p>
                <p>Zone: {{ booking.zoneName }}</p>
                <p>Nights: {{ booking.numberOfNights }}</p>
                <p>Name: {{ booking.name }}</p>
                <p>Email: {{ booking.email }}</p>
                <p>Phone Number: {{ booking.phone }}</p>
                <p>Special Requests: {{ booking.specialRequests }}</p>
                <p>Total Price: {{ booking.totalPrice }}</p>
              </div>
            </div>

            <button
              class="cursor-pointer hover:text-white btn btn-outline btn-error text-xl font-semibold"
              @click="deleteHandler(booking.id, index)"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}

body {
  transition: background-color 0.3s ease;
}

.dark-mode {
  background-color: #333;
  color: #fff;
}
</style>
