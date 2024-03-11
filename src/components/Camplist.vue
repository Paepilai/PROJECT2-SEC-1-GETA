<script setup>
import CampCard from "./CampCard.vue"
import ListCard from "./ListCard.vue"
import camp from "../../data/camp.json"
</script>

<template>
  <div>
    <ListCard :items="camp">
      <template #default="slotProps">
        <CampCard>
          <template v-slot:location>
            <img :src="slotProps.item.ListImage[0].image" alt="location" />
          </template>
          <template v-slot:title>{{ slotProps.item.Title }}</template>
          <template v-slot:description>{{
            slotProps.item.Description.detail
          }}</template>
        </CampCard>
      </template>
    </ListCard>
  </div>
</template>

<style scoped></style>
