<template>
  <div>
    <h1>Booking History</h1>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(booking, index) in bookings" :key="index" class="card">
        <h2>{{ booking.name }}</h2>
        <p>Check-in Date: {{ booking.checkinDate }}</p>
        <p>Check-out Date: {{ booking.checkoutDate }}</p>
        <p>Email: {{ booking.email }}</p>
        <button @click="deleteHandler(booking.id, index)">Delete</button>
      </div>
    </div>
    <router-link to="/">Go to Home Page</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchBookings, deleteBooking } from "../../libs/BookingFetch.js";

const router = useRouter();
const isLoading = ref(false);
const bookings = ref([]);

const fetchData = async () => {
  try {
    isLoading.value = true;
    bookings.value = await fetchBookings();
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching history:", error);
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
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
