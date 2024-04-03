<script setup>
import { ref, onMounted } from "vue"
import { getItems, editItem, editFavorite } from "../libs/fetchUtils"
import { myUserTodo } from "../stores/users.js"
import CampCard from "../components/CampCard.vue"
import ListCard from "../components/ListCard.vue"

//ค่อยทำ if ให้เป็นของ user ที่ login มา
const newFav = ref()

const id = ref()
const name = ref()
const location = ref()
const job = ref()
const email = ref()
const password = ref()
const phone = ref()
const bio = ref()
const favorite = ref()

const showEditModal = ref(false)
const showPassword = ref(false)

const myUser = myUserTodo()
const favoriteUser = ref()
const showModal = ref(false)
const showModalLogout = ref(false)
const campidref = ref()

onMounted(async () => {
  const items = await getItems(import.meta.env.VITE_USER_BASE_URL)

  const userNow = myUser.getTodos()

  newFav.value = {
    ...userNow[0],
  }

  favoriteUser.value = items.filter((camp) =>
    userNow[0].favorite.includes(parseInt(camp.id))
  )

  id.value = newFav.value.id
  name.value = newFav.value.name
  location.value = newFav.value.location
  job.value = newFav.value.job
  email.value = newFav.value.email
  password.value = newFav.value.password
  phone.value = newFav.value.phone
  bio.value = newFav.value.bio
  favorite.value = newFav.value.favorite
})

const openModal = (campid) => {
  campidref.value = campid
  showModal.value = true
}

const openLogoutModal = () => {
  showModalLogout.value = true
  localStorage.removeItem("user")
  // window.location.href = "/login"
}

const closeModal = () => {
  showModal.value = false
}

const updateProfile = async () => {
  // event.preventDefault()
  const userNow = myUser.getTodos()
  console.log(userNow)
  const updatedProfile = {
    id: id.value,
    name: name.value,
    location: location.value,
    job: job.value,
    email: email.value,
    password: password.value,
    phone: phone.value,
    bio: bio.value,
    favorite: favorite.value,
  }
  console.log(updatedProfile)

  const response = await editItem(
    import.meta.env.VITE_USER_BASE1_URL,
    id.value,
    updatedProfile
  )

  console.log(response)

  myUser.updateTodoUser(updatedProfile.id, updatedProfile)
  console.log(myUser.getTodos())

  showEditModal.value = false
}

const deleteAccount = async () => {
  const userNow = myUser.getTodos()
  const response = await deleteItemById(
    import.meta.env.VITE_USER_BASE1_URL,
    id.value
  )
  // console.log(response)
  // userNow.reUser()
}

async function deleteFav(idcamp) {
  console.log(newFav.value.favorite)
  const indexToRemove = newFav.value.favorite.findIndex(
    (item) => item === parseInt(idcamp)
  )
  if (indexToRemove !== -1) {
    newFav.value.favorite.splice(indexToRemove, 1)
  }

  const deleteCamp = await editFavorite(
    `${import.meta.env.VITE_USER_BASE1_URL}`,
    newFav.value.id,
    newFav.value
  )
  console.log(deleteCamp)

  //frontend
  favoriteUser.value.splice(
    favoriteUser.value.findIndex((todo) => todo.id === idcamp),
    1
  )

  // myUser.updateTodo(newFav.value.id, newFav.value.favorite)

  console.log(myUser.getTodos())

  //close modal
  closeModal()
}
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="border-2 rounded-md shadow-md m-3 p-3 mt-4 h-auto w-1/2 flex">
      <div class="flex p-5">
        <img
          src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
          alt="Profile Image" class="h-40 w-40 object-cover rounded-t" />
        <div>
          <h1 class="text-3xl font-bold mb-4">{{ name }}</h1>
          <p class="text-gray-600 mb-2">💼 {{ job }}</p>
          <p class="text-gray-600 mb-4">📍{{ location }}</p>
          <hr class="border border-dotted" />
          <p class="text-black mb-4">{{ bio }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="flex items-center justify-center">
    <button @click="showEditModal = true" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
      Edit Profile
    </button>
    <!-- <button
      @click.prevent="deleteAccount"
      class="bg-red-500 text-white font-bold py-2 px-4 my-4 ml-4 rounded"
    >
      Delete Account
    </button> -->
    <button class="bg-red-500 text-white font-bold py-2 px-4 my-4 ml-4 rounded" @click="openLogoutModal()">
      Log out
    </button>
  </div>
  <hr />

  <h1 class="text-3xl font-bold mb-4 mt-4 ml-10">Favorite Campground</h1>

  <div>
    <ListCard :items="favoriteUser">
      <template #default="slotProps">
        <CampCard :name="slotProps.item.name" :location="slotProps.item.location" :id="slotProps.item.id">
          <template v-slot:option>
            <button class="btn btn-sm" @click="openModal(slotProps.item.id)">
              X
            </button>

            <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-center justify-center min-h-screen">
                <div class="flex flex-col bg-white p-10 rounded shadow w-auto h-auto relative">
                  <button class="absolute top-0 right-0 m-4" @click="closeModal()">
                    x
                  </button>
                  <h2 class="pb-5">Are you sure?</h2>
                  <button class="btn btn-outline btn-error" @click="deleteFav(campidref)">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <div v-if="showModalLogout" class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-center justify-center min-h-screen">
                <div class="flex flex-col bg-white p-10 rounded shadow w-auto h-auto relative">
                  <button class="absolute top-0 right-0 m-4" @click="showModalLogout = false">
                    x
                  </button>
                  <h2 class="pb-5">Do you want to log out?</h2>
                  <RouterLink to="/" class="btn btn-outline btn-error">
                    Yes
                  </RouterLink>
                </div>
              </div>
            </div>
          </template>

          <template v-slot:location>
            <img :src="slotProps.item.image" alt="Location Image" class="h-60 w-80 object-cover rounded-t pt-3" />
          </template>
        </CampCard>
      </template>
    </ListCard>
  </div>

  <div v-if="showEditModal" class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen bg-black/[.05]">
      <div class="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Edit Mode</h2>
        <label for="name" class="font-bold">Name: </label>
        <br /><input v-model="name" type="text" id="name" class="input input-bordered mb-3 w-full" placeholder="Name" />

        <br /><label for="job" class="font-bold">Job: </label> <br /><input v-model="job" type="text" id="job"
          class="input input-bordered mb-3 w-full" placeholder="Job" />

        <br /><label for="location" class="font-bold">Location: </label>
        <br /><input v-model="location" type="text" id="location" class="input input-bordered mb-3 w-full"
          placeholder="Location" />

        <br /><label for="location" class="font-bold">Phone: </label>
        <br /><input v-model="phone" type="text" class="input input-bordered mb-3 w-full" placeholder="Phone" />

        <br /><label for="bio" class="font-bold">Bio: </label> <br /><textarea v-model="bio" id="bio"
          class="textarea textarea-bordered mb-3 w-full" placeholder="Bio"></textarea>

        <br /><label for="email" class="font-bold">Email: </label> <br /><input v-model="email" type="email" id="email"
          class="input input-bordered mb- 3 w-full" placeholder="Email" />

        <br /><label for="password" class="font-bold">Password: </label>
        <br /><input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
          class="input input-bordered mb-3 w-full" placeholder="Password" />
        <br /><input type="checkbox" v-model="showPassword" class="ml-2" /> Show
        Password

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