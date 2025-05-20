<script setup lang="ts">

import { formatDate, isToday } from '../../../utils/date';

import SearchInput from '../components/SearchInput.vue';
import { useCalendarStore } from '@/modules/calendar/stores'
import { ROUTES } from './../routes'

const store = useCalendarStore()

function search(item: Station) {
    store.selectStation(item);
}

function nextWeek() {
    store.nextWeek();
}

function prevWeek() {
    store.prevWeek();
}

function thisWeek() {
    store.thisWeek();
}

</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full min-h-screen max-w-4xl bg-white shadow-lg rounded-lg p-6">

        <div>
            <div class="flex justify-between items-center mb-4">
                <ClientOnly>
                    <SearchInput
                        placeholder="Search camps" search-id="name" :get-results="store.stationsList"
                        @select-item="search" />
                </ClientOnly>
                <div class="flex space-x-2">
                    <button
                        class="p-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        @click="thisWeek">Today</button>
                    <button
                        class="p-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        @click="prevWeek">&lt; Prev week</button>
                    <button
                        class="p-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        @click="nextWeek">Next week &gt;</button>
                </div>
            </div>

            <div class="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div v-for="(day, index) in store.week" :key="index" class="flex-1 w-full lg:w-1/3">
                    <div  class="p-2 rounded-lg mb-2" :class="isToday(day.date) ? 'bg-blue-100' : 'bg-gray-100'">
                        <div class="font-bold text-sm">{{ formatDate(day.date) }}</div>
                    </div>
                    
                    <div v-if="day.bookings.length" class="p-2 bg-green-300 rounded-lg cursor-pointer">
                        <NuxtLink
                            v-for="(booking, i) in day.bookings"
                            :key="i" class=""
                            :to="{ name: ROUTES.Booking, params: { bookingId: booking.id, stationId: booking.pickupReturnStationId } }">
                            {{ booking.customerName }}
                        </NuxtLink>
                    </div>
                    <div v-else class="p-2 bg-gray-50 rounded-lg">
                        <span class="text-gray-300">No bookings</span>      
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div>
</template>

<style scoped></style>
