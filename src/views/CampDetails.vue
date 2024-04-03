<template>
  <div v-if="campground">
    <div class="col-span-2">
      <div class="flex-col">
        <div class="font-bold text-4xl p-10 text-center inline flex-row">
          <div class="flex flex-row justify-between px-16">

            <!-- <RouterLink to="/" class="btn btn-circle text-bold"> < </RouterLink> -->

            <!-- ทำ data ลง backend -->
            <button @click="saveFavorite(), (isFavoriteClicked = true)" :class="{
    'btn hover:bg-red-500 hover:text-white': true,
    'btn bg-red-500 text-white': isFavoriteClicked,
  }">
              Favorite
            </button>
          </div>

          <h1>{{ campground.name }}</h1>
        </div>
        <div>
          <img :src="campground.image" class="rounded-lg max-w-lg justify-center mx-auto" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 gap-1 pb-20">
      <div class="col-start-1 col-span-2">
        <div class="font-bold text-2xl m-10 pl-20">
          <h3>Description</h3>
        </div>
        <div class="text-lg m-10 pl-20 pr-20 pb-10">
          <p>{{ campground.description }}</p>
        </div>

        <div class="font-bold text-2xl m-10 pl-20">
          <h3>Rule</h3>
        </div>

        <div class="text-lg m-10 pl-20 pr-20 pb-10">
          <template v-if="Array.isArray(campground.rule)">
            <ul v-for="(rule, index) in campground.rule" :key="index" class="list-disc pl-10">
              <li>{{ rule }}</li>
            </ul>
          </template>
          <template v-else>
            <p>{{ campground.rule }}</p>
          </template>
        </div>

        <div class="font-bold text-xl m-10 pl-20">
          <h3>Contact : {{ campground.contact }}</h3>
        </div>
      </div>

      <div class="col-start-3 border-2 rounded-md shadow-md m-5 h-auto">
        <div class="font-bold text-3xl p-10 text-center">
          <h3>Camp Details</h3>
        </div>
        <hr class="h-2 border-dashed border-gray-300" />
        <div class="font-bold text-2xl p-5 text-center">
          <h3>Location</h3>
        </div>
        <div class="text-xl pl-10 pr-10 pb-5 text-center">
          <p>{{ campground.location }}</p>
        </div>
        <hr class="h-2 border-dashed border-gray-300" />
        <div class="font-bold text-2xl p-5 text-center">
          <h3>Service</h3>
        </div>
        <div class="text-xl pl-10 pr-10 pb-5">
          <ul v-for="(service, index) in campground.service" :key="index" class="list-disc pl-10">
            <li>{{ service }}</li>
          </ul>
        </div>


        <hr class="h-2 border-dashed border-gray-300" />
        <div class="font-bold text-2xl p-5 text-center">
          <h3>Price</h3>
        </div>
        <!-- <div class="text-xl pl-10 pr-10 pb-5">
          <ul
            v-for="(price, index) in campground.price"
            :key="index"
            class="list-disc pl-10"
          >
            <li>{{ item }}:{{ price }}</li>
          </ul>
        </div> -->
        <!-- <div class="text-xl pl-10 pr-10 pb-5">
          <ul v-for="(price, itemName) in campground.price" :key="itemName">
            <li>{{ itemName }}: {{ price }} THB</li>
          </ul>
        </div> -->
        <div class="text-xl pl-10 pr-10 pb-5">
          <ul class="list-disc pl-10">
            <li>Sleeping Bag {{ campground.price.sleeping_bag }} THB</li>

            <li>Mattress {{ campground.price.mattress }} THB</li>

            <li>Pillow {{ campground.price.pillow }} THB</li>
          </ul>
        </div>
        <hr class="h-2 border-dashed border-gray-300" />

        <div class="flex justify-center p-5">
          <div class="transition-transform duration-300 hover:scale-105 cursor-pointer">
            <RouterLink :to="{ path: '/available', query: { campId: campground.id } }"
              class="btn bg-[#F79C1D] hover:bg-[#F79C1D] text-white text-2xl">
              Join Camp
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>

  <div v-else>
    <p>This camp not found..</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getItems, editItem, editFavorite } from "../libs/fetchUtils.js"
import { myUserTodo } from "@/stores/users"

const { params } = useRoute()
const campground = ref(null)
const newFav = ref({})
const id = params.id

const isFavoriteClicked = ref(false)

const myUser = myUserTodo()
onMounted(async () => {
  console.log(id)

  const items = await getItems(import.meta.env.VITE_USER_BASE_URL)
  console.log(items)

  campground.value = items.find((camp) => parseInt(camp.id) === parseInt(id))
  console.log(campground.value)
})

async function saveFavorite() {
  const userNow = myUser.getTodos()
  console.log(userNow[0].favorite)

  newFav.value = {
    ...userNow[0],
  }

  if (!userNow[0].favorite.includes(parseInt(id))) {
    newFav.value.favorite.push(parseInt(id))
  }

  const addFav = await editFavorite(
    import.meta.env.VITE_USER_BASE1_URL,
    newFav.value.id,
    newFav.value


  )
  console.log(addFav)

  myUser.updateTodo(newFav.value.id, newFav.value.favorite)
}
</script>

<style scoped>
.transition-transform {
  transition-property: transform;
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
