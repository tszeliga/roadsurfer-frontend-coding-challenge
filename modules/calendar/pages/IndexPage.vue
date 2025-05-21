<script setup lang="ts">

import SearchInput from '../components/SearchInput.vue';
import BookingDayCard from '../components/BookingDayCard.vue'
import { useCalendarStore } from '@/modules/calendar/stores'

const store = useCalendarStore()

const search = (item: Station) => {
    store.selectStation(item);
}

const nextWeek = () => {
    store.nextWeek();
}

const prevWeek = () => {
    store.prevWeek();
}

const thisWeek = () => {
    store.thisWeek();
}

</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full min-h-screen max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div>
            <div class="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <SearchInput
                    placeholder="Search camps" class="flex flex-1 w-full" search-id="name" :init-text="store.selectedStationName" :get-results="store.stationsList"
                    @select-item="search" />
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
                <BookingDayCard
                    v-for="(day) in store.week"
                    :key="day.date"
                    :day="day"
                />
            </div>
        </div>
    </div>
    </div>
</template>
