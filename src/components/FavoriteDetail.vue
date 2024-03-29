<script setup>
import ListCard from "./ListCard.vue"
import CampCard from "./CampCard.vue"
import { onMounted } from "vue"
import { myUserTodo } from "../stores/users.js"
import { getItems, editItem } from "../libs/fetchUtils.js"
import { ref } from "vue"

const myUser = myUserTodo()
const favoriteUser = ref()
const newFav = ref({ id: undefined, favorite: "" })
const showModal = ref(false)
const campidref = ref()

const openModal = (campid) => {
  campidref.value = campid
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(async () => {
  const items = await getItems(`${import.meta.env.VITE_BASE_URL}camp`)

  const userNow = myUser.getTodos()

  favoriteUser.value = items.filter((camp) =>
    userNow[0].favorite.includes(parseInt(camp.id))
  )
})

async function deleteFav(idcamp) {
  console.log(idcamp)
  const userNow = myUser.getTodos()
  console.log(userNow[0].favorite)

  newFav.value = { id: userNow[0].id, favorite: userNow[0].favorite }
  console.log(newFav.value.favorite)

  if (userNow[0].favorite.includes(parseInt(idcamp))) {
    //แก้
    newFav.value.favorite.splice(newFav.value.favorite.indexOf(idcamp), 1)
  }

  const deleteCamp = await editItem(
    `${import.meta.env.VITE_BASE_URL}users`,
    newFav.value.id,
    newFav.value
  )
  console.log(deleteCamp)

  myUser.updateTodo(newFav.value.id, newFav.value.favorite)

  console.log(myUser.getTodos())

  //close modal
  closeModal()
}
</script>

<template>
  <div>
    <ListCard :items="favoriteUser">
      <template #default="slotProps">
        <CampCard
          :name="slotProps.item.name"
          :location="slotProps.item.location"
          :id="slotProps.item.id"
        >
          <template v-slot:option>
            {{ slotProps.item.id }}
            <button class="btn btn-sm" @click="openModal(slotProps.item.id)">
              X
            </button>

            <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-center justify-center min-h-screen">
                <div
                  class="flex flex-col bg-white p-10 rounded shadow w-auto h-auto relative"
                >
                  <button
                    class="absolute top-0 right-0 m-4"
                    @click="closeModal()"
                  >
                    x
                  </button>
                  <h2 class="pb-5">Are you sure?</h2>
                  <button
                    class="btn btn-outline btn-error"
                    @click="deleteFav(campidref)"
                  >
                    {{ campidref }}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </template>

          <template v-slot:location>
            <img
              :src="slotProps.item.image"
              alt="Location Image"
              class="h-60 w-80 object-cover rounded-t pt-3"
            />
          </template>
        </CampCard>
      </template>
    </ListCard>
  </div>
</template>

<style scoped></style>
