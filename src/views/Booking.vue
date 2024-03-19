<script setup>
import { ref, defineProps, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// const redirectToReceipt = () => {
//   console.log("Routing..")
//   router.push("/receipt")
// }

const redirectToReceipt = () => {
  console.log("Routing..")
  router.push({
    path: "/receipt",
    query: {
      chosenDate: chosenDate.value,
      nameValue: nameValue.value,
      emailValue: emailValue.value,
      phoneValue: phoneValue.value,
      specialValue: specialValue.value,
    },
  })
}

const chosenDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialValue = ref("")

onMounted(() => {
  const route = router.currentRoute.value
  chosenDate.value = route.query.chosenDate || null
})
</script>

<template>
  <div id="bookInfo">
    <div
      class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
      >
        <!-- Date, Nights -->
        {{ chosenDate }}
        <!-- <div v-if="chosenDates.length === 2">
          <p>
            Selected Date Range: {{ chosenDates[0] }} to {{ chosenDates[1] }}
          </p>
          <p>Nights: {{ nights }} night(s)</p>
        </div> -->
        <!-- {{ dateRange[0] }} to {{ dateRange[1] }} ({{ nights }} nights) -->
      </div>

      <form class="py-4 px-6" action="" method="POST">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="name">
            Living Details
          </label>
          <h1>dff</h1>
        </div>
      </form>
    </div>
    <div
      class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
      >
        User Information
      </div>
      <form class="py-4 px-6" action="" method="POST">
        <div class="mb-4">
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
        <h1>Contact Information</h1>
        <div class="mb-4">
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
        <div class="mb-4">
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

        <div class="mb-4">
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
          <button
            class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="button"
            @click="redirectToReceipt()"
          >
            Book Camp
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
