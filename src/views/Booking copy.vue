<template>
  <div>
    <h1>Booking Page</h1>
    <h2>Zone ID: {{ zoneId }}</h2>
    <h2>Zone Name: {{ zoneName }}</h2>

    <div>
      <label for="checkin">Check-in Date:</label>
      <input
        type="date"
        id="checkin"
        v-model="checkinDate"
        :min="minCheckinDate"
        @input="updateCheckoutMinDate"
      />
    </div>
    <div>
      <label for="checkout">Check-out Date:</label>
      <input
        type="date"
        id="checkout"
        v-model="checkoutDate"
        :min="minCheckoutDate"
      />
    </div>
    <div>Total Nights: {{ numberOfNights }}</div>
    <div>Total Price: {{ totalPrice }}</div>
    <div>
      <h2>User Booking Information</h2>
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="nameValue" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="emailValue" />
      </div>
      <div>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="phoneValue" />
      </div>
      <div>
        <label for="specialRequests">Special Requests:</label>
        <textarea id="specialRequests" v-model="specialRequests"></textarea>
      </div>
      <button @click="submitBooking">Book</button>
    </div>
  </div>
</template>

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
</script>
