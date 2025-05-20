<script setup lang="ts">


import { formatDate } from '../../../utils/date';

import SearchInput from '../components/SearchInput.vue';
import { useCalendarStore } from '@/modules/calendar/stores'
import { ROUTES } from './../routes'
// import { formatDate } from '../utils/date`';

const store = useCalendarStore()

const formatDate = (date) => {
    const month = date.getMonth() + 1; // months are 0-indexed
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
};


function search(item: Station) {
    store.selectStation(item);
}

function nextWeek() {
    store.nextWeek();
}

function prevWeek() {
    store.prevWeek();
}

</script>

<template>
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 mb-6 mt-6">

        <div>
            <div class="flex justify-between items-center mb-4">
                <SearchInput
placeholder="Search camps" search-id="name" :get-results="store.stationsList"
                    @select-item="search" />
                <div class="flex space-x-2">
                    <button
class="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        @click="prevWeek">Prev</button>
                    <button
class="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        @click="nextWeek">Next</button>
                </div>
            </div>

            <div class="flex justify-between items-center mb-4">
                <div v-for="(day, index) in store.week" :key="index" class="p-2 bg-gray-100 rounded-lg">
                    <div class="font-bold text-lg">{{ formatDate(day.date) }}</div>
                </div>
            </div>

            <div class="flex justify-between items-center mb-4">
                <div v-for="(day, index) in store.week" :key="index">
                    <div v-if="day.bookings.length" class="p-2 bg-gray-100 rounded-lg">
                        <NuxtLink
v-for="(booking, i) in day.bookings" :key="i"
                            :to="{ name: ROUTES.Booking, params: { bookingId: booking.id, stationId: store.selectedStation.id } }">
                            {{ booking.customerName }}
                        </NuxtLink>

                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>
