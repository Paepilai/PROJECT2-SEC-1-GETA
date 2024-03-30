<template>
  <div>
    <h1>Booking Receipt</h1>
    <template v-if="booking">
      <p>Check-in Date: {{ booking.checkinDate }}</p>
      <p>Check-out Date: {{ booking.checkoutDate }}</p>
      <p>Name: {{ booking.name }}</p>
      <p>Email: {{ booking.email }}</p>
      <p>Special Requests: {{ booking.specialRequests }}</p>
      <p>Number of Nights: {{ booking.numberOfNights }}</p>
      <p>Total Price: {{ booking.totalPrice }}</p>
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { saveBooking } from "../../libs/BookingFetch.js";

const booking = ref(null);
const route = useRoute();

onMounted(() => {
  const routeQuery = route.query;
  if (routeQuery) {
    booking.value = {
      checkinDate: routeQuery.checkinDate,
      checkoutDate: routeQuery.checkoutDate,
      name: routeQuery.nameValue,
      email: routeQuery.emailValue,
      specialRequests: routeQuery.specialRequests,
      numberOfNights: routeQuery.numberOfNights,
      totalPrice: routeQuery.totalPrice,
    };
    saveBooking(booking.value);
  }
});
</script>
