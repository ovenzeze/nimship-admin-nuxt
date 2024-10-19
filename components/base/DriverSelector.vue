<template>
  <Popover>
    <PopoverTrigger as-child>
      <div class="relative  min-w-[300px] rounded-full" :class="props.class" ref="inputWrapper">
        <Input v-model="searchQuery" placeholder="Search driver by name or id" @focus="handleFocus" @input="handleInput"
          class="h-9 w-full" />
        <Button v-if="selectedDriver" variant="ghost" size="icon"
          class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="clearSelection">
          <Icon name="ph:x" class="w-4 h-4" />
        </Button>
        <Button v-else variant="ghost" size="icon" class="absolute right-2 top-1/2 transform -translate-y-1/2"
          @click="clearSelection">
          <Icon v-if="isSearchLoading" name="ph:spinner" class="w-4 h-4 bg-opacity-75" />
          <Icon v-else name=" ph:seal-percent" class="w-4 h-4 bg-opacity-75" />
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent :style="{ width: `${inputWidth}px` }" class="p-0 ">
      <Command class="min-h-[100px] overflow-y-scroll border  transition-all"
        :class="{ 'border-breath-light  dark:border-breath-dark animate-breath ': isSearchLoading }">
        <CommandEmpty v-if="noDriversLoaded"
          class="w-full min-h-full items-center justify-center p-4 flex text-muted-foreground/80 content-center shadow-lg">
          Unable to load drivers. Please try again later.
        </CommandEmpty>
        <template v-else>
          <CommandEmpty v-if="searchPerformed && drivers && drivers.length === 0"
            class="p-2 text-center text-sm text-muted-foreground w-full flex items-center justify-center h-[100px]">
            No drivers found.
          </CommandEmpty>
          <template v-else-if="!searchQuery">
            <CommandGroup v-if="recentSearches.length > 0" heading="Recent Search Drivers">
              <CommandItem v-for="driver in recentSearches" :key="driver.uid" :value="driver.uid"
                @select="selectDriver(driver)"
                class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
                <DriverItem :driver="driver" />
              </CommandItem>
            </CommandGroup>
            <CommandGroup v-if="drivers.length > 0" heading="Frequently Used Drivers">
              <CommandItem v-for="driver in drivers" :key="driver.uid" :value="driver.uid"
                @select="selectDriver(driver)"
                class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
                <DriverItem :driver="driver" />
              </CommandItem>
            </CommandGroup>
            <CommandEmpty v-if="recentSearches.length === 0 && drivers.length === 0"
              class="pt-4 px-4 text-center text-sm text-muted-foreground min-h-full ">
              No recent or frequently used drivers. Start searching to find drivers.
            </CommandEmpty>
          </template>
          <CommandGroup v-else-if="drivers.length > 0" heading="Search Results">
            <CommandItem v-for="driver in drivers" :key="driver.uid" :value="driver.uid" @select="selectDriver(driver)"
              class="w-full flex flex-col items-center justify-center border-b border-border last:border-b-0 animate-fade-in-up">
              <DriverItem :driver="driver" />
            </CommandItem>
          </CommandGroup>
        </template>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import { useDriver } from '~/composables/useDriver'
import type { Database } from '~/types/database'

type Driver = Database['public']['Tables']['haulblaze_contact']['Row']

const props = defineProps<{
  modelValue?: string | null
  class?: string | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const searchQuery = ref('')
const drivers = ref<Driver[]>([])
const debouncedSearchQuery = useDebounce(searchQuery, 300)
const selectedDriver = ref<Driver | null>(null)
const searchPerformed = ref(false)
const inputWrapper = ref<HTMLElement | null>(null)
const inputWidth = ref(300)


const { isSearchLoading, error, recentSearches, searchDrivers, addToRecentSearches, getFrequentlyUsedDrivers } = useDriver()

const noDriversLoaded = computed(() => {
  return !isSearchLoading.value && error.value !== null && drivers.value.length === 0 && recentSearches.value.length === 0
})

watch(debouncedSearchQuery, async (newQuery) => {
  const selectedDriverName = `${selectedDriver.first_name} ${selectedDriver.last_name}`.toUpperCase()
  const isSelectedDriver = newQuery === selectedDriverName
  if (newQuery && !isSelectedDriver) {
    searchPerformed.value = true
    const result = await searchDrivers(newQuery)
    drivers.value = result as Driver[]
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

const updateInputWidth = () => {
  if (inputWrapper.value) {
    inputWidth.value = inputWrapper.value.offsetWidth
  }
}

onMounted(async () => {
  if (drivers.value.length === 0) {
    await getFrequentlyUsedDrivers()
  }

  nextTick(() => {
    updateInputWidth()
    window.addEventListener('resize', updateInputWidth)

    const resizeObserver = new ResizeObserver(updateInputWidth)
    if (inputWrapper.value) {
      resizeObserver.observe(inputWrapper.value)
    }
  })
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

@keyframes breathing {

  0%,
  100% {
    border-color: rgba(59, 130, 246, 0.5);
  }

  50% {
    border-color: rgba(59, 130, 246, 1);
  }
}

.border-breathing {
  animation: breathing 2s ease-in-out infinite;
}

.driver-selector-command {
  width: 100%;
  min-height: 200px;
}
</style>
