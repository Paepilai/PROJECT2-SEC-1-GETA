<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { addItem } from "../libs/fetchUtils"
import { myUserTodo } from "../stores/users"

const router = useRouter()
const users = ref()

const email = ref("")
const password = ref("")

const showPassword = ref(false)

const formData = ref({
  name: "",
  location: "",
  job: "",
  email: "",
  password: "",
  phone: "",
  bio: "",
  favorite: [],
})
const closeModal = () => {
  my_modal_1.close()
}

const clearRegistrationForm = () => {
  formData.value.name = ""
  formData.value.location = ""
  formData.value.job = ""
  formData.value.email = ""
  formData.value.password = ""
  formData.value.phone = ""
  formData.value.bio = ""
  formData.value.favorite = []
}

const register = () => {
  if (!isValidFormData()) {
    alert("Please fill in complete information.")
    return
  }

  const newUser = addItem(import.meta.env.VITE_USER_BASE_URL, {
    name: formData.value.name,
    location: formData.value.location,
    job: formData.value.job,
    email: formData.value.email,
    password: formData.value.password,
    phone: formData.value.phone,
    bio: formData.value.bio,
    favorite: formData.value.favorite,
  })

  console.log(newUser)
  alert("Registration successful!")
  closeModal()
  clearRegistrationForm()
}

const isValidFormData = () => {
  const requiredFields = ["name", "email", "password"]
  for (const field of requiredFields) {
    if (!formData.value[field]) {
      return false
    }
  }
  return true
}

const loginUser = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_USER_BASE_URL)
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    const data = await response.json()
    users.value = data
  } catch (error) {
    console.error(error)
  }

  console.log(users.value)

  const user = users.value.find(
    (user) => user.email === email.value && user.password === password.value
  )

  console.log(user)
  if (user) {
    const myUser = myUserTodo()
    console.log(myUser.getTodos())
    myUser.addTodos([user])

    console.log(myUser.getTodos())

    router.push("/home")
  } else {
    alert("Invalid email or password")
  }
}
router.beforeEach(async (to, from) => {
  const myUser = myUserTodo()
  const emptyUser = myUser.getTodos()

  if (emptyUser.length === 0 && to.name !== "Login") {
    return "/"
  }
})
</script>
<template>
  <div class="full-page">
    <div class="box-center">
      <div class="mt-5 text-2xl font-bold text-slate-950">Login</div>
      <div class="m-5">
        <label class="input input-bordered flex items-center gap-2 m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          ></svg>
          <input type="text" class="grow" v-model="email" placeholder="Email" />
        </label>
        <label class="input input-bordered flex items-center gap-2 m-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="w-4 h-4 opacity-70"
          ></svg>
          <input
            :type="showPassword ? 'text' : 'password'"
            class="grow"
            v-model="password"
            placeholder="Password"
          />
        </label>

        <input type="checkbox" v-model="showPassword" class="ml-2 mb-5" />
        Show Password
        <button class="btn btn-outline btn-accent mr-5" @click="loginUser">
          Login
        </button>
        <button class="btn" onclick="my_modal_1.showModal()">Register</button>

        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
            <h3 class="font-bold text-lg">Register</h3>
            <label class="input input-bordered flex items-center gap-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              ></svg>
              <input
                type="text"
                class="grow"
                v-model="formData.name"
                placeholder="Name"
              />
            </label>
            <label class="input input-bordered flex items-center gap-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              ></svg>
              <input
                type="text"
                class="grow"
                v-model="formData.email"
                placeholder="Email"
              />
            </label>

            <label class="input input-bordered flex items-center gap-2 m-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                class="w-4 h-4 opacity-70"
              ></svg>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                class="grow"
                placeholder="Password"
              />
            </label>
            <input
              type="checkbox"
              v-model="showPassword"
              class="ml-2 mb-5 text-left"
            />
            Show Password
            <div class="modal-action">
              <form @submit.prevent="register" method="dialog">
                <!-- End register -->
                <button class="btn m-2">Register</button>
              </form>
              <button class="btn m-2" @click="closeModal">Close</button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<style scoped>
.full-page {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a504b;
}

.box-center {
  width: 20%;
  height: 65%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>
