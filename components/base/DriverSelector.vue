<template>
  <Popover>
    <PopoverTrigger as-child class="min-w-[300px]">
      <div class="relative">
        <Input v-model="searchQuery" placeholder="Search by name or id" @focus="handleFocus" @input="handleInput"
          class="min-w-60 h-10" />
        <Button v-if="selectedDriver" variant="ghost" size="icon"
          class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="clearSelection">
          <Icon name="ph:x" class="w-4 h-4" />
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="w-[92vw] md:w-[300px] p-0">
      <Command>
        <TransitionGroup enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1">
          <div v-if="isLoading" key="loading" class="p-2 text-center text-sm text-muted-foreground animate-pulse">
            Searching...
          </div>
          <template v-else>
            <CommandEmpty v-if="searchPerformed && drivers.length === 0" key="empty" class="animate-fade-in">
              No drivers found.
            </CommandEmpty>
            <template v-else-if="!searchQuery" key="default">
              <CommandGroup v-if="recentSearches.length > 0" heading="Recent Search Drivers">
                <CommandItem v-for="driver in recentSearches" :key="driver.uid" :value="driver.uid"
                  @select="selectDriver(driver)"
                  class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
                  <div class="w-full flex flex-row items-center justify-between text-xs">
                    <p class="text-xs line-clamp-1 truncate uppercase">{{ `${driver.first_name} ${driver.last_name}` }}
                    </p>
                    <p class="w-18 text-muted-foreground">{{ driver.warehouse || 'N/A' }}</p>
                  </div>
                  <div class="w-full flex flex-row items-center justify-between gap-x-4 gap-y-2 text-xs">
                    <span class="text-gray-500 text-sm">{{ driver.driver_id?.join(', ') || 'N/A' }}</span>
                    <p class="text-right w-32 overflow-hidden text-muted-foreground">{{ driver.team_name || 'N/A' }}</p>
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandGroup v-if="drivers.length > 0" heading="Frequently Used Drivers">
                <CommandItem v-for="driver in drivers" :key="driver.uid" :value="driver.uid"
                  @select="selectDriver(driver)"
                  class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
                  <div class="w-full flex flex-row items-center justify-between text-xs">
                    <p class="text-xs line-clamp-1 truncate uppercase">{{ `${driver.first_name} ${driver.last_name}` }}
                    </p>
                    <p class="w-18 text-muted-foreground">{{ driver.warehouse || 'N/A' }}</p>
                  </div>
                  <div class="w-full flex flex-row items-center justify-between gap-x-4 gap-y-2 text-xs">
                    <span class="text-gray-500 text-sm">{{ driver.driver_id?.join(', ') || 'N/A' }}</span>
                    <p class="text-right w-32 overflow-hidden text-muted-foreground">{{ driver.team_name || 'N/A' }}</p>
                  </div>
                </CommandItem>
              </CommandGroup>
            </template>
            <CommandGroup v-else-if="drivers.length > 0" key="results" heading="Search Results">
              <CommandItem v-for="driver in drivers" :key="driver.uid" :value="driver.uid"
                @select="selectDriver(driver)"
                class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
                <div class="w-full flex flex-row items-center justify-between text-xs">
                  <p class="text-xs line-clamp-1 truncate uppercase">{{ `${driver.first_name} ${driver.last_name}` }}
                  </p>
                  <p class="w-18 text-muted-foreground">{{ driver.warehouse || 'N/A' }}</p>
                </div>
                <div class="w-full flex flex-row items-center justify-between gap-x-4 gap-y-2 text-xs">
                  <span class="text-gray-500 text-sm">{{ driver.driver_id?.join(', ') || 'N/A' }}</span>
                  <p class="text-right w-32 overflow-hidden text-muted-foreground">{{ driver.team_name || 'N/A' }}</p>
                </div>
              </CommandItem>
            </CommandGroup>
          </template>
        </TransitionGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useDriver } from '~/composables/useDriver'
import type { Database } from '~/types/database'

type Driver = Database['public']['Tables']['haulblaze_contact']['Row']

const props = defineProps<{
  modelValue: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const searchQuery = ref('')
const debouncedSearchQuery = useDebounce(searchQuery, 300)
const selectedDriver = ref<Driver | null>(null)
const searchPerformed = ref(false)

const { drivers, isLoading, error, recentSearches, searchDrivers, addToRecentSearches, getFrequentlyUsedDrivers } = useDriver()

watch(debouncedSearchQuery, async (newQuery) => {
  if (newQuery) {
    searchPerformed.value = true
    await searchDrivers(newQuery)
  } else {
    searchPerformed.value = false
    await getFrequentlyUsedDrivers()
  }
})

const handleFocus = async () => {
  if (!searchQuery.value && drivers.value.length === 0) {
    await getFrequentlyUsedDrivers()
  }
}

const handleInput = async () => {
  if (selectedDriver.value) {
    selectedDriver.value = null
    emit('update:modelValue', null)
  }
}

const selectDriver = async (driver: Driver) => {
  selectedDriver.value = driver
  searchQuery.value = `${driver.first_name} ${driver.last_name}`.toUpperCase()
  emit('update:modelValue', driver.uid)
  addToRecentSearches(driver)
}

const clearSelection = () => {
  selectedDriver.value = null
  searchQuery.value = ''
  emit('update:modelValue', null)
}

onMounted(async () => {
  if (drivers.value.length === 0) {
    await getFrequentlyUsedDrivers()
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}
</style>