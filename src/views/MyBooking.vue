<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-for="(booking, index) in bookings" :key="index" class="card">
        <h2>Booking Number: {{ booking.id }}</h2>
        <p>Check-in Date: {{ booking.checkinDate }}</p>
        <p>Check-out Date: {{ booking.checkoutDate }}</p>
        <p>Zone: {{ booking.zoneI }}</p>
        <p>Nights: {{ booking.numberOfNights }}</p>
        <p>Name: {{ booking.name }}</p>
        <p>Email: {{ booking.email }}</p>
        <p>Phone Number: ต้องการ</p>
        <p>Special Requests: {{ booking.specialRequests }}</p>
        <p>Total Equipments Price: {{ booking.totalPrice }}</p>

        <p>Total Nights Price: {{ booking.totalPrice }}</p>

        <p>All Total: {{ booking.totalPrice }}</p>

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
