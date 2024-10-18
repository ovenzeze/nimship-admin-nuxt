<template>
    <div class="flex items-center justify-center md:justify-between px-1 py-2">
        <div class="flex items-center space-x-6 lg:space-x-8">

            <div class="flex items-center space-x-2">
                <Button variant="outline" class="h-6 w-6 p-0 rounded-full" :disabled="!table.getCanPreviousPage()"
                    @click="table.previousPage()">
                    <span class="sr-only">Go to previous page</span>
                    <Icon name="ph:caret-left-bold" class="h-3 w-3" />
                </Button>
                <div class="flex items-center">
                    <Button v-for="pageNumber in visiblePageNumbers" :key="pageNumber" variant="outline" :class="[
                        'h-6 w-6 p-1.5 mx-1 rounded-full content-center text-center',
                        pageNumber === currentPage ? 'bg-primary/20 text-primary-foreground' : ''
                    ]" @click="table.setPageIndex(pageNumber - 1)">
                        {{ pageNumber }}
                    </Button>
                </div>
                <Button variant="outline" class="h-6 w-6 p-0 rounded-full" :disabled="!table.getCanNextPage()"
                    @click="table.nextPage()">
                    <span class="sr-only">Go to next page</span>
                    <Icon name="ph:caret-right-bold" class="h-3 w-3" />
                </Button>
            </div>
            <div class="items-center justify-center text-sm text-secondary-foreground/50 hidden md:flex">
                {{ `Showing ${currentPage * Number(pageSize) + 1} - ${Math.min(currentPage * Number(pageSize) +
                    Number(pageSize), props.totalCount)} Records of ${props.totalCount}` }}
                <!-- Showing {{ currentPage x pageSize.value }} - {{ (currentPage + 1) x pageSize.value }} of {{ totalCount -->
            </div>
        </div>
        <div class="md:flex items-center space-x-2 hidden">
            <!-- <p class="text-sm font-medium">Rows per page</p> -->
            <Select v-model="pageSize" @update:modelValue="table.setPageSize($event)">
                <SelectTrigger class="h-8 w-[70px]">
                    <SelectValue :placeholder="table.getState().pagination.pageSize" />
                </SelectTrigger>
                <SelectContent side="top">
                    <SelectItem v-for="size in [10, 20, 30, 40, 50]" :key="size" :value="size">
                        {{ size }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    table: any
    totalCount: number
}>()

const pageSize = ref(props.table.getState().pagination.pageSize)
const currentPage = computed(() => props.table.getState().pagination.pageIndex + 1)
const pageCount = computed(() => Math.ceil(props.totalCount / pageSize.value))

const visiblePageNumbers = computed(() => {
    const totalPages = pageCount.value
    const current = currentPage.value
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
            range.push(i)
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push('...')
            }
        }
        rangeWithDots.push(i)
        l = i
    }

    return rangeWithDots
})
</script>