<template>
    <div class="flex items-center justify-between px-4 py-1 sm:px-6">
        <div class=" flex-1 justify-between hidden">
            <UButton :disabled="page === 1" @click="updatePage(page - 1)" variant="outline">
                Previous
            </UButton>
            <UButton :disabled="page === pageCount" @click="updatePage(page + 1)" variant="outline">
                Next
            </UButton>
        </div>
        <div class="flex flex-1 items-center md:justify-between">
            <div class="hidden md:block">
                <p class="text-sm text-gray-700">
                    Showing
                    <span class="font-medium">{{ startIndex }}</span>
                    to
                    <span class="font-medium">{{ endIndex }}</span>
                    of
                    <span class="font-medium">{{ total }}</span>
                    results
                </p>
            </div>
            <div class="w-full md:w-auto flex flex-row items-center justify-center">
                <UPagination v-model="localPage" :page-count="pageCount" :total="total" :ui="{
                    wrapper: 'shadow-sm gap-1 py-0',
                    base: ' text-center text-xs w-[28px] h-[28px] flex items-center justify-center rounded-full',
                    rounded: '',
                }" />
            </div>
        </div>
        <!-- <USelect v-model="localPageSize" :options="pageSizeOptions" class="w-24 ml-4"
            @update:modelValue="updatePageSize" /> -->
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { type DriverType, type driverTypes } from '~/types'

const props = defineProps<{
    page: number
    pageCount?: number
    pageSize: number
    total: number
}>()

const emit = defineEmits<{
    (e: 'update:page', pagination: driverTypes['pagination']): void
}>()

const localPage = ref(props.page)
const localPageSize = ref(props.pageSize)
const pageCount = computed(() => Math.floor(props.total / props.pageSize))


const pageSizeOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
]

const startIndex = computed(() => (props.page - 1) * props.pageSize + 1)
const endIndex = computed(() => Math.min(props.page * props.pageSize, props.total))


const updatePage = (newPage: number) => {
    emit('update:page', { page: newPage })
}

const updatePageSize = (size: number) => {
    emit('update:page', { size, page: 1 })
}

watch(() => localPage.value, (next, prev) => {
    if (next !== prev) emit('update:page', { page: next })
})
</script>