<script setup lang="ts">
    import { ROUTES } from '../routes'
</script>

<template>
     <div class="max-w-4xl mx-auto">
        <!-- Calendar Header -->
        <div class="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-semibold text-gray-800">Week of May 16 - May 22, 2025</h2>
                <div class="flex space-x-2">
                    <button class="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Prev</button>
                    <button class="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">Next</button>
                </div>
            </div>
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-2">
                <!-- Weekday Labels -->
                <div class="text-center font-semibold text-gray-600">Sunday</div>
                <div class="text-center font-semibold text-gray-600">Monday</div>
                <div class="text-center font-semibold text-gray-600">Tuesday</div>
                <div class="text-center font-semibold text-gray-600">Wednesday</div>
                <div class="text-center font-semibold text-gray-600">Thursday</div>
                <div class="text-center font-semibold text-gray-600">Friday</div>
                <div class="text-center font-semibold text-gray-600">Saturday</div>
                <!-- Calendar Days -->
                <div class="bg-white p-2 rounded-md">
                    <NuxtLink :to="{ name: ROUTES.Booking, params: { id: 1 } }">1</NuxtLink>
                </div>
                <div class="bg-white p-2 rounded-md">
                    <NuxtLink :to="{ name: ROUTES.Booking, params: { id: 2 } }">2</NuxtLink>
                </div>
                <div class="bg-white p-2 rounded-md">3</div>
                <div class="bg-white p-2 rounded-md">4</div>
                <div class="bg-white p-2 rounded-md">5</div>
                <div class="bg-white p-2 rounded-md">6</div>
                <div class="bg-white p-2 rounded-md">7</div>
                <!-- You can dynamically generate more days here -->
            </div>
        </div>
    </div>
</template>

<style scoped></style>
