<script setup lang="ts">
import { ROUTES } from './modules/calendar/routes'
</script>
<template>
  <div>
    Main
    <NuxtLink :to="{ name: ROUTES.Booking, params: { id: 123 } }">
    Post 123
    </NuxtLink>
    <NuxtLink to="/">Go to Main</NuxtLink>
    <NuxtPage />
  </div>
</template>
