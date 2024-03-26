<script setup>
import { ref, defineProps, onMounted } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

// const redirectToReceipt = () => {
//   router.push({
//     path: "/receipt",
//     query: {
//       chosenDate: chosenDate.value,
//       nameValue: nameValue.value,
//       emailValue: emailValue.value,
//       phoneValue: phoneValue.value,
//       specialValue: specialValue.value,
//       totalPrice: calculateTotalPrice(),
//     },
//   })
// }

const chosenDate = ref(null)
const nameValue = ref("")
const emailValue = ref("")
const phoneValue = ref("")
const specialValue = ref("")

onMounted(() => {
  const route = router.currentRoute.value
  chosenDate.value = route.query.chosenDate || null
  nameValue.value = route.query.nameValue || ""
  emailValue.value = route.query.emailValue || ""
  phoneValue.value = route.query.phoneValue || ""
  specialValue.value = route.query.specialValue || ""
})
</script>

<template>
  <a
    href="#"
    class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
  >
    <img
      class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
      src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSGfpQ3m-QWiXgCBJJbrcUFdNdWAhj7rcUqjeNUC6eKcXZDAtWm"
      alt=""
    />
    <div class="flex flex-col justify-between p-4 leading-normal">
      <h5
        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Noteworthy technology acquisitions 2021
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far,
        in reverse chronological order.
      </p>
    </div>
  </a>
</template>

<style scoped></style>
