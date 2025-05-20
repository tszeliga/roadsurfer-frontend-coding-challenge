<template>
    <div class="">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input v-model="searchText" autocomplete="off" type="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="placeholder" required @input="onInputChange" @blur="reset" @focus="onInputChange" />

             <transition name="fade" mode="out-in">
              <ul v-if="items.length > 0 && isListVisible" class="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                <li v-for="(item, index) in items" :key="index" class="block hover:bg-gray-200 hover:cursor-pointer px-4 py-2 text-sm text-gray-700" @click="select(item)">{{ item.name }}</li>
              </ul>
            </transition>
        </div>
      </div>

</template>

<script setup lang="ts">

import { debounce } from "lodash"

const props = defineProps<{
  placeholder: string,
  searchId: string,
  getResults: Array<Station>
}>()

const emit = defineEmits(["selectItem"])

const MIN_DIGITS: number = 3
const DEBOUNCE_TIME: number = 300
const items = ref<Array<Station>>([]);
const searchText = ref<string>("")
const isListVisible = ref<boolean>(false)

const onInputChange = debounce(() => {

  if (searchText.value.length === 0) {
    items.value = [];
    isListVisible.value = false;
    return;
  }

  if (searchText.value.length >= MIN_DIGITS) {
    items.value = props.getResults.filter(item => item.name.toLowerCase().includes(searchText.value.toLowerCase()))
    isListVisible.value = true;
    
  }
}, DEBOUNCE_TIME)

function select(item: Station) {
  emit("selectItem", item);
  searchText.value = item.name; //todo zeby tekst
  isListVisible.value = false;
}

function reset() {
  isListVisible.value = false;
}

</script>

<style scoped>
.autocomplete-container {
  position: relative;
  width: 300px;
}

.autocomplete-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.autocomplete-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 100;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.autocomplete-suggestion {
  padding: 8px;
  cursor: pointer;
}

.autocomplete-suggestion:hover {
  background-color: #f0f0f0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
