<script setup>
import { ref, onMounted } from "vue"
import { editItem } from "../libs/fetchUtils"
import data from "../../data/camp.json"
import CampCard from "../components/CampCard.vue"
import ListCard from "../components/ListCard.vue"

//ค่อยทำ if ให้เป็นของ user ที่ login มา
const user = data.user[0];

const id = ref(user.id)
const name = ref(user.name)
const location = ref(user.location)
const job = ref(user.job)
const email = ref(user.email)
const password = ref(user.password)
const phone = ref(user.phone)
const bio = ref(user.bio)
const favorite = ref(user.favorite)

const showEditModal = ref(false)
const showPassword = ref(false)

const updateProfile = async () => {
  const updatedProfile = {
    id: id.value,
    name: name.value,
    location: location.value,
    job: job.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    bio: bio.value,
    favorite: favorite.value
  }

  const response = await editItem(
    import.meta.env.VITE_USER_BASE1_URL,
    id.value,
    updatedProfile
  )
  console.log(response)

  showEditModal.value = false;
}

const deleteAccount = async () => {
  const response = await deleteItemById(
    import.meta.env.VITE_USER_BASE1_URL,
    id.value
  )
  console.log(response)
  //ไปหน้า login ต่อ
}

onMounted(() => {
  id.value = user.id
  name.value = user.name
  location.value = user.location
  job.value = user.job
  email.value = user.email
  password.value = user.password
  phone.value = user.phone
  bio.value = user.bio
  favorite.value = user.favorite
})
</script>

<template>
  <div class="flex items-center justify-center ">
    <div class="border-2 rounded-md shadow-md m-3 p-3 mt-4 h-auto w-1/2 flex">
      <div class="flex p-5">
        <img
          src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
          alt="Profile Image" class="h-40 w-40 object-cover rounded-t" />
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ name }}</h1>
          <p class="text-gray-600 mb-2">💼 {{ job }}</p>
          <p class="text-gray-600 mb-4">📍{{ location }}</p>
          <hr class="border border-dotted">
          <p class="text-black mb-4">{{ bio }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <button @click="showEditModal = true" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Edit Profile
    </button>
    <button @click.prevent="deleteAccount" class="bg-red-500 text-white font-bold py-2 px-4 my-4 ml-4 rounded">
      Delete Account
    </button>
  </div>
  <hr>

  <h1 class="text-3xl font-bold mb-4 mt-4">Favorite Campground</h1>
  <p>{{ favorite }}</p>

  <div v-if="showEditModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen bg-black/[.05]">
      <div class="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Edit Mode</h2>
        <label for="name" class="font-bold">Name: </label>
        <br><input v-model="name" type="text" id="name" class="input input-bordered mb-3 w-full" placeholder="Name" />

        <br><label for="job" class="font-bold">Job: </label>
        <br><input v-model="job" type="text" id="job" class="input input-bordered mb-3 w-full" placeholder="Job" />

        <br><label for="location" class="font-bold">Location: </label>
        <br><input v-model="location" type="text" id="location" class="input input-bordered mb-3 w-full"
          placeholder="Location" />

        <br><label for="location" class="font-bold">Phone: </label>
        <br><input v-model="phone" type="text" class="input input-bordered mb-3 w-full" placeholder="Phone" />

        <br><label for="bio" class="font-bold">Bio: </label>
        <br><textarea v-model="bio" id="bio" class="textarea textarea-bordered mb-3 w-full "
          placeholder="Bio"></textarea>

        <br><label for="email" class="font-bold">Email: </label>
        <br><input v-model="email" type="email" id="email" class="input input-bordered mb-3 w-full"
          placeholder="Email" />

        <br><label for="password" class="font-bold">Password: </label>
        <br><input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
          class="input input-bordered mb-3 w-full" placeholder="Password" />
        <br><input type="checkbox" v-model="showPassword" class="ml-2"> Show Password

        <div class="flex justify-end">
          <button type="submit" @click.prevent="updateProfile"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
          <button @click="showEditModal = false"
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2">
            Close
          </button>
        </div>
      </div>


    </div>
  </div>

</template>

<style scoped></style>
