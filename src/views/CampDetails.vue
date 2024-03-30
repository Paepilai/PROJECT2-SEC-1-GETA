<template>
  <div v-if="campground">
    <div class="col-span-2">
      <div class="flex-col">
        <div class="font-bold text-4xl p-10 text-center inline flex-row">
          <RouterLink to="/" class="btn btn-circle text-bold"> </RouterLink>

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
        <div class="text-xl pl-10 pr-10 pb-5">
          <ul v-for="(price, index) in campground.price" :key="index" class="list-disc pl-10">
            <li>
              {{ price }}
            </li>
          </ul>
        </div>
        <hr class="h-2 border-dashed border-gray-300" />
        <div class="flex justify-center p-5">
          <!-- <RouterLink
            to="/available"
            class="btn bg-[#F79C1D] hover:bg-[#F79C1D] text-white text-2xl"
            >Join Camp</RouterLink
          > -->
          <RouterLink :to="{ path: '/available', query: { campId: campground.id } }"
            class="btn bg-[#F79C1D] hover:bg-[#F79C1D] text-white text-2xl">
            Join Camp
          </RouterLink>
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
import Data from "../../data/camp.json"

const route = useRoute()
const campground = ref(null)
// เรียก camp จาก data เพราะมี 2 ข้อมูลตอนนี้
const campData = ref(Data.camp)

//เหมือนว่าเช็คไอดีถูกแล้วแต่มันไม่ขึ้นข้อมูลแคมป์น่ะ ช่วยดูให้หน่อย
onMounted(() => {
  const id = route.params.id
  campground.value = Data.camp.find((camp) => camp.id === parseInt(id))
})

</script>

<style scoped></style>
