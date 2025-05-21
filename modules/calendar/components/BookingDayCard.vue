<script setup lang="ts">
import { formatDate, isToday } from '../../../utils/date';
import { ROUTES } from './../routes';

defineProps<{
  day: {
    date: Date;
    bookings: Array<Booking>;
  };
}>();
</script>

<template>
  <div class="flex-1 w-full lg:w-1/3">
    <div class="p-2 rounded-lg mb-2" :class="isToday(day.date) ? 'bg-blue-100' : 'bg-gray-100'">
      <div class="font-bold text-sm">{{ formatDate(day.date) }}</div>
    </div>

    <div v-if="day.bookings.length">
      <NuxtLink
        v-for="(booking) in day.bookings"
        :key="booking.id"
        class="p-2 bg-green-300 rounded-lg cursor-pointer flex"
        :to="{
          name: ROUTES.Booking,
          params: {
            bookingId: booking.id,
            stationId: booking.pickupReturnStationId
          }
        }"
      >
        {{ booking.customerName }}
      </NuxtLink>
    </div>
    <div v-else class="p-2 bg-gray-50 rounded-lg">
      <span class="text-gray-300">No bookings</span>
    </div>
  </div>
</template>