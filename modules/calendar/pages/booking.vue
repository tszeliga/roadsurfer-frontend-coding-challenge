<script setup lang="ts">
import { fetchBooking } from '../services/bookingsService.api';
import Loading from '../components/Loading.vue';
import { formatDate } from './../../../utils/date';
import { ROUTES } from './../routes'
const route = useRoute()
const booking = ref<Booking | null>(null);
const isLoading = ref(true);

const { params } = useRoute()
const fetchDate = async () => {
    try {
        const response = await fetchBooking(params.stationId as string, route.params.bookingId as string);
        booking.value = response;
    } catch (error) {
        console.error('Error fetching booking:', error);
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    fetchDate();
})

</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <NuxtLink
                :to="{ name: ROUTES.Calendar }"
                class="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                &lt; Go back
            </NuxtLink>
            
            <div v-if="booking && !isLoading" class="flex flex-col md:flex-row gap-6 mt-5">

                <div class="flex-1">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Booking Details</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Booking ID:</span>
                            <span class="font-medium text-gray-800"> {{ booking.id }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Pickup Station ID:</span>
                            <span class="font-medium text-gray-800"> {{ booking.pickupReturnStationId }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Start Date:</span>
                            <span class="font-medium text-gray-800">{{ formatDate(booking.startDate) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">End Date:</span>
                            <span class="font-medium text-gray-800">{{ formatDate(booking.endDate) }}</span>
                        </div>

                    </div>
                </div>

                <div class="flex-1">
                    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Customer Information</h2>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Customer:</span>
                            <span class="font-medium text-gray-800"> {{ booking.customerName }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="isLoading" class="flex justify-center mt-6">
                <Loading />
            </div>
        </div>
    </div>
</template>
