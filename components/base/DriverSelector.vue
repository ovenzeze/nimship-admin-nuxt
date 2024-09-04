<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child class="min-w-60">
      <div class="relative">
        <Input v-model="searchQuery" placeholder="Try search by name and id" @focus="isOpen = true" @input="handleInput"
          class="min-w-60" />
        <Button v-if="selectedDriver" variant="ghost" size="icon"
          class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="clearSelection">
          <Icon name="ph:x" class="w-4 h-4" />
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="min-w-[400px] p-0 mr-8">
      <Command>
        <CommandInput placeholder="Search driver" v-model="searchQuery" @input="handleInput" />
        <CommandEmpty v-if="!isLoading && drivers.length === 0">No drivers found.</CommandEmpty>
        <CommandGroup v-else>
          <CommandItem v-for="driver in readableDrivers" :key="driver.uid" :value="driver.uid"
            @select="selectDriver(driver)" class="flex flex-row items-center justify-items-center gap-x-4 gap-y-2">
            <p class="w-60 text-sm line-clamp-1 truncate">{{ driver.name }}</p>
            <p class="w-10 text-muted-foreground">{{ driver.warehouse }}</p>
            <p class="text-right w-32 overflow-hidden text-muted-foreground">{{ driver.team_name }}</p>
            <!-- <span class="text-gray-500 text-sm">{{ driver.driver_id }}</span> -->
          </CommandItem>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounce } from '@vueuse/core'
import { useDriver } from '~/composables/useDriver'

const props = defineProps<{
  modelValue: number | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const isOpen = ref(false)
const searchQuery = ref('')
const debouncedSearchQuery = useDebounce(searchQuery, 300)
const selectedDriver = ref<{ id: number; name: string } | null>(null)

const { drivers, isLoading, error, searchDrivers, getRecentDrivers } = useDriver()

const readableDrivers = computed(() => drivers.value.map(getReadableDriver))

watch(debouncedSearchQuery, async (newQuery) => {
  if (newQuery) {
    await searchDrivers(newQuery)
  } else {
    await getRecentDrivers()
  }
})

const handleInput = () => {
  if (selectedDriver.value) {
    selectedDriver.value = null
    emit('update:modelValue', null)
  }
}

const selectDriver = (driver: { id: number; name: string }) => {
  selectedDriver.value = driver
  searchQuery.value = driver.name
  emit('update:modelValue', driver.id)
  isOpen.value = false
}

const clearSelection = () => {
  selectedDriver.value = null
  searchQuery.value = ''
  emit('update:modelValue', null)
}

const loadRecentDrivers = async () => {
  await getRecentDrivers()
}

// 初始加载最近使用的司机
onMounted(async () => {
  await loadRecentDrivers()
})
</script>