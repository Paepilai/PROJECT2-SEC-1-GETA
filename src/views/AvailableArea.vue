<template>
  <div>
    <h1 class="text-3xl text-center font-bold mt-6">{{ campground.name }}</h1>
    <div
      v-for="(zone, index) in campground.area"
      :key="index"
      class="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div
        class="text-2xl py-4 px-6 bg-[#8C9579] text-white text-center font-bold uppercase"
      >
        Zone {{ zone.zoneId }}
      </div>
      <div class="py-4 px-6">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2">{{ zone.zoneName }}</label>
          <h1>{{ zone.zoneDesc }}</h1>
        </div>
        <button
          class="bg-[#E6BB96] text-black py-2 px-4 rounded hover:bg-[#8C9579] focus:outline-none focus:shadow-outline"
          @click="redirectToBooking(zone)"
        >
          Book
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import campData from "../../data/camp.json";
import { useRouter } from "vue-router";

const router = useRouter();
const campId = router.currentRoute.value.query.campId;
const campground = campData[0];
const checkinDate = ref(null);
const checkoutDate = ref(null);
const selectedZone = ref(null);

const redirectToBooking = (zone) => {
  selectedZone.value = zone;
  router.push({
    path: "/booking",
    query: {
      campgroundName: campground.name,
      chosenDate: checkinDate.value,
      checkoutDate: checkoutDate.value,
      campId: campId,
      zoneId: zone.zoneId,
      zoneName: zone.zoneName,
      zoneDesc: zone.zoneDesc,
    },
  });
};

const numberOfNights = computed(() => {
  if (!checkinDate.value || !checkoutDate.value) return 0;
  const startDate = new Date(checkinDate.value);
  const endDate = new Date(checkoutDate.value);
  const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
  const numberOfNights = Math.ceil(timeDifference / (1000 * 3600 * 24));
  return numberOfNights;
});
</script>

<style scoped>
/* Your scoped styles */
</style>
