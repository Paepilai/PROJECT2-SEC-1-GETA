<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(booking, index) in bookings" :key="index" class="card">
        <h2>Booking Number: {{ booking.id }}</h2>
        <p>Campground: {{ booking.campgroundName }}</p>
        <p>Check-in Date: {{ booking.checkinDate }}</p>
        <p>Check-out Date: {{ booking.checkoutDate }}</p>
        <p>Zone: {{ booking.zoneName }}</p>
        <p>Nights: {{ booking.numberOfNights }}</p>
        <p>Name: {{ booking.name }}</p>
        <p>Email: {{ booking.email }}</p>
        <p>Phone Number: {{ booking.email }}</p>
        <p>Special Requests: {{ booking.specialRequests }}</p>
        <p>Total Price: {{ booking.totalPrice }}</p>

        <img
          :src="getCampgroundImage(booking.campgroundName)"
          alt="Campground Image"
          style="max-width: 100px; max-height: 100px"
        />

        <button @click="deleteHandler(booking.id, index)">Delete</button>
      </div>
    </div>
    <router-link to="/">Go to Home Page</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  fetchBookings,
  deleteBooking,
  fetchCampgrounds,
} from "../../libs/BookingFetch.js";

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

const goToHomePage = () => {
  router.push("/");
};

const getCampgroundImage = (campgroundName) => {
  const campground = campgrounds.value.find((camp) => camp.name === campgroundName);
  return campground && campground.image ? campground.image : "placeholder.jpg";
};
</script>
<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
