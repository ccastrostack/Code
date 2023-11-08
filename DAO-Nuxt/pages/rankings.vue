<template lang="">
  <div class="mt-12 w-full px-4 md:px-8 2xl:px-32 text-gray-900 min-w-[300px]">
    <div class="flex flex-wrap justify-center items-center gap-10">
      <div class="div w-full sm:w-auto">
        <div class="flex justify-between">
          <h1 class="h1-text-xs md:h1-text-md">Trending DAOs:</h1>
          <Popover class="relative">
            <PopoverButton
              class="h1-text-xs md:w-48 md:h1-text-md ml-1 text-blue-500"
            >
              {{ day > 1 ? day + ' days' : day + ' day' }}

              <icon name="chevron-down" class="inline-block h-8 w-8" />
            </PopoverButton>

            <PopoverPanel
              class="absolute z-10 py-6 px-6 bg-white rounded-2xl shadow-2xl right-0 md:inset-x-0"
            >
              <div class="flex flex-col gap-y-3 w-32 text-black text-lg">
                <PopoverButton
                  class="flex justify-between text-left px-2 py-1 rounded-2xl hover:bg-gray-200"
                  @click="day = 1"
                >
                  <div>24 hrs</div>
                  <div v-if="day === 1">
                    <icon
                      name="check"
                      class="inline-block h-5 w-5 fill-black"
                    />
                  </div>
                </PopoverButton>
                <PopoverButton
                  class="flex justify-between text-left px-2 py-1 rounded-2xl hover:bg-gray-200"
                  @click="day = 7"
                >
                  <div>7 days</div>
                  <div v-if="day === 7">
                    <icon
                      name="check"
                      class="inline-block h-5 w-5 fill-black"
                    />
                  </div>
                </PopoverButton>
                <PopoverButton
                  v-if="selectedFilter === 'token-price'"
                  class="flex justify-between text-left px-2 py-1 rounded-2xl hover:bg-gray-200"
                  @click="day = 30"
                >
                  <div>30 days</div>
                  <div v-if="day === 30">
                    <icon
                      name="check"
                      class="inline-block h-5 w-5 fill-black"
                    />
                  </div>
                </PopoverButton>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between px-2 sm:px-2 py-2 w-full sm:w-auto rounded-full border-[0.2px] border-gray-300 medium-text-sm"
      >
        <button
          class="m-0"
          :class="[
            selectedFilter === 'token-price' ? ' selected' : 'not-selected',
          ]"
          @click="selectedFilter = 'token-price'"
        >
          By Token Price
        </button>
        <button
          class="m-0"
          :class="[
            selectedFilter === 'community-growth'
              ? ' selected'
              : 'not-selected',
          ]"
          @click="selectedFilter = 'community-growth'"
        >
          By Community Growth
        </button>
      </div>
    </div>
    <TransitionRoot
      appear
      :show="data !== undefined"
      enter="transition-opacity duration-100"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity duration-100"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <RankingsTable
        :data="data ?? []"
        :day="day"
        :selected-filter="selectedFilter"
        :more-loading="moreItemsRequested"
        @getNextDaos="getMoreItems"
      />
    </TransitionRoot>
  </div>
</template>
<script setup>
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
} from '@headlessui/vue';

import { ref, watch, computed } from 'vue';
import axios from 'axios';
import { useRuntimeConfig, useAsyncData } from '#app';

// eslint-disable-next-line no-undef
definePageMeta({
  title: 'Trending DAOs',
  description: 'Trending DAOs',
});

const d = typeof document === 'undefined' ? null : document;
if (d) {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const config = useRuntimeConfig();

const day = ref(7);
const limit = 30;
const start = ref(limit);
const moreItemsRequested = ref(false);
const selectedFilter = ref('token-price');
const changeDays = async () => {
  data.value = await getLeaderBoard(day.value, limit);
};

const computedUrl = computed(() => {
  if (selectedFilter.value === 'community-growth') {
    return `${config.apiUrl}daos-leaderboard`;
  }
  return `${config.apiUrl}daos-token-rank`;
});

const getLeaderBoard = () => {
  try {
    return axios
      .get(computedUrl.value, {
        params: {
          start: 0,
          day: day.value,
          limit,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

async function getMoreItems() {
  if (moreItemsRequested.value) return;
  moreItemsRequested.value = true;
  await window
    .$fetch(computedUrl.value, {
      params: {
        start: start.value,
        day: day.value,
        limit,
      },
    })
    .then((response) => {
      start.value += limit;
      data.value.push(...response);
      return response;
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log(error))
    .finally(() => {
      moreItemsRequested.value = false;
    });
}

watch(day, () => {
  data.value = [];

  changeDays();
});
watch(selectedFilter, (newValue) => {
  if (newValue === 'community-growth' && day.value === 30) day.value = 1;
  data.value = [];

  changeDays();
});

const { data } = useAsyncData('leaderboard', () => getLeaderBoard(), {
  default: () => [],
});
</script>

<style>
.selected {
  @apply rounded-full bg-gray-900 px-4 py-2 text-white;
}

.not-selected {
  @apply px-3 py-2 sm:px-4;
}
</style>
