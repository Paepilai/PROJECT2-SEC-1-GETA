// stores/BookingStore.js
import { defineStore } from "pinia"

export const useBookingStore = defineStore({
  id: "booking",
  state: () => ({
    calculateTentTotal: 0,
    calculateSleepingBagTotal: 0,
    calculateMattressTotal: 0,
    calculatePillowTotal: 0,
    calculateTotalAmount: 0,
  }),
  actions: {
    setTotals({
      calculateTentTotal,
      calculateSleepingBagTotal,
      calculateMattressTotal,
      calculatePillowTotal,
      calculateTotalAmount,
    }) {
      this.calculateTentTotal = calculateTentTotal
      this.calculateSleepingBagTotal = calculateSleepingBagTotal
      this.calculateMattressTotal = calculateMattressTotal
      this.calculatePillowTotal = calculatePillowTotal
      this.calculateTotalAmount = calculateTotalAmount
    },
  },
})
