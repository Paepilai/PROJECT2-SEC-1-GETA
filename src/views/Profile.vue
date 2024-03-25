<script setup>
import { ref, onMounted } from "vue"
import { editItem } from "../libs/fetchUtils"
import user from "../../data/user.json"

const id = ref(user[0].id)
const name = ref(user[0].name)
const email = ref(user[0].email)
const bio = ref(user[0].bio)

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const updateProfile = async () => {
  const updatedProfile = {
    id: id.value,
    name: name.value,
    email: email.value,
    bio: bio.value,
  }
  console.log(updatedProfile)

  const response = await editItem(
    import.meta.env.VITE_USER_BASE1_URL,
    id.value,
    updatedProfile
  )
  console.log(response)

  if (response) {
    name.value = response.name
    email.value = response.email
    bio.value = response.bio
  }

  closeModal()
}

onMounted(async () => {
  name.value = user[0].name
  email.value = user[0].email
  bio.value = user[0].bio
})
</script>

<template>
  <div class="p-3 mt-2">
    <h1 class="text-3xl font-bold mb-4">{{ name }}</h1>
    <p class="text-gray-600 mb-2">{{ email }}</p>
    <p class="text-gray-600 mb-4">{{ bio }}</p>
    <button
      @click="openModal"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Edit Profile
    </button>

    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen">
        <div class="bg-white w-1/2 p-6 rounded shadow">
          <h2 class="text-2xl font-bold mb-4">Edit Mode</h2>
          <form>
            <div class="mb-4">
              <label for="name" class="block text-gray-700 font-bold mb-2"
                >Name:</label
              >
              <input
                type="text"
                id="name"
                v-model="name"
                class="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-bold mb-2"
                >Email:</label
              >
              <input
                type="email"
                id="email"
                v-model="email"
                class="border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div class="mb-4">
              <label for="bio" class="block text-gray-700 font-bold mb-2"
                >Bio:</label
              >
              <textarea
                id="bio"
                v-model="bio"
                class="border border-gray-300 rounded px-4 py-2"
              ></textarea>
            </div>
            <div class="flex justify-end">
              <button
                type="submit"
                @click.prevent="updateProfile"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                @click="closeModal"
                class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
