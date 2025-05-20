<template>
    <div>   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3">
                <SearchIcon />
            </div>
            <input
              v-model="searchText" 
              autocomplete="off" 
              type="search" 
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              :placeholder="placeholder" 
              required 
              @input="onInputChange" 
              @blur="reset" 
              @focus="onInputChange"
              >

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
import SearchIcon from "./SearchIcon.vue"

interface SearchElement {
  id: string;
  name: string;
}

const props = defineProps<{
  placeholder: string,
  searchId: string,
  getResults: Array<SearchElement>
}>()

const emit = defineEmits(["selectItem"])

const MIN_DIGITS: number = 3
const DEBOUNCE_TIME: number = 300
const items = ref<Array<SearchElement>>([]);
const searchText = ref<string>("")
const isListVisible = ref<boolean>(false)

const onInputChange = debounce(() => {
  const query = searchText.value.trim().toLowerCase();

  if (!query) {
    items.value = [];
    isListVisible.value = false;
    return;
  }

  if (query.length >= MIN_DIGITS) {
    items.value = props.getResults.filter(({ name }) =>
      name.toLowerCase().includes(query)
    );
    isListVisible.value = !!items.value.length;
    return
  }

  items.value = [];
  isListVisible.value = false;

}, DEBOUNCE_TIME);

function select(item: SearchElement): void {
  emit("selectItem", item);
  searchText.value = item.name;
  isListVisible.value = false;
}

function reset(): void {
  isListVisible.value = false;
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
