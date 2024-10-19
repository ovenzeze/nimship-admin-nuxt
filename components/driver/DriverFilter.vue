<template>
    <div class="w-full grid grid-cols-4 py-5 px-2">
        <div class="left col-span-2 hidden md:block">
            <DriverSelector :class="'max-w-[300px]'" @update:modelValue="handleDriverChange" />
        </div>
        <div
            class="col-span-4 md:col-span-2 w-full right flex flex-row justify-around md:justify-end items-center gap-x-4 px-4">
            <FilterItem v-for="cItem in filterConfigs" :config="cItem"
                :modelValue="filters[cItem.key as keyof typeof filters]"
                @update:modelValue="($event) => handleFilterItemChange(cItem.key, $event)" />
            <span class="flex content-center cursor-pointer flex-row items-center justify-center min-w-[100px]"
                @click="() => emit('reset:filter')">
                <Icon name="i-ph-funnel" class="w-4 h-4 mr-1" /> Reset
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useEnums } from '~/composables/useEnums'
import { EnumType, type DeliveryFilters } from '~/types'


const emit = defineEmits<{
    (e: 'update:filter', filters: { key: string, item: any }): void
    (e: 'reset:filter'): void

}>()

const props = defineProps<{
    filters: DeliveryFilters
    loading: boolean
}>()


const filterConfigs = ref([
    {
        type: 'select' as const,
        key: 'warehouse',
        placeholder: 'Warehouse',
        enumType: EnumType.WAREHOUSE_CODE,
        as: 'button'
    },
    {
        type: 'select' as const,
        key: 'team_name',
        placeholder: 'Team',
        enumType: EnumType.TEAM_NAME,
        selectFirstOption: true
    }
])

const handleFilterItemChange = (key: string, item: any) => {
    if (item) {
        console.log('[DriverFilter][handleFilterItemChange]item:', item, 'key:', key)
        emit('update:filter', { key, item })
    }
}

const handleDriverChange = (uid) => {
    console.log('[DriverFilter][handleDriverChange]uid:', uid)
    if (!uid) return
    emit('update:filter', { key: 'uid', item: uid })
}



</script>
