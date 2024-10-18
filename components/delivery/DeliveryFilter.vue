<template>
    <div class="w-full grid grid-cols-4">
        <div class="left col-span-2">
            <DriverSelector :class="'max-w-[300px]'" @update:modelValue="handleDriverChange" />
        </div>
        <div class="col-span-2 w-full right flex flex-row justify-end items-center gap-x-4">
            <FilterItem v-for="cItem in filterConfigs" :key="cItem.key" :config="cItem"
                :modelValue="filters[cItem.key as keyof typeof filters]"
                @update:value="($event) => handleFilterItemChange(cItem.key, $event)" />
            <span class="flex content-center cursor-pointer" @click="() => emit('reset:filter')">
                <Icon name="i-ph-funnel" class="w-5 h-5 mr-1" /> Reset
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEnums } from '~/composables/useEnums'
import { useDelivery } from '~/composables/useDelivery'
import { EnumType, type DeliveryFilters } from '~/types'
import { type filterOptionItem } from '../base/FilterItem.vue';

const { getEnumsByType, waitForEnums } = useEnums()

const emit = defineEmits<{
    (e: 'update:filter', filters: { key: string, item: filterOptionItem }): void
    (e: 'reset:filter'): void

}>()

const props = defineProps<{
    filters: DeliveryFilters
}>()

// const filters = ref<DeliveryFilters>({
//     warehouse_id: '',
//     cycle_start: '',
//     team: '',
//     uid: '',
//     driver_id: ''
// })


const filterConfigs = ref([
    {
        type: 'select' as const,
        key: 'warehouse_id',
        placeholder: 'Warehouse',
        enumType: EnumType.WAREHOUSE_CODE,
        as: 'button'
    },
    {
        key: 'cycle_start',
        placeholder: 'Pay Cycle',
        enumType: EnumType.CYCLE,
        selectFirstOption: true
    },
    {
        type: 'select' as const,
        key: 'team',
        placeholder: 'Team',
        enumType: EnumType.TEAM_NAME,
        selectFirstOption: true
    }
])

const handleFilterItemChange = (key: string, item: filterOptionItem) => {
    if (item) {
        console.log('[handleFilterItemChange]item:', item, key)
        emit('update:filter', { key, item })
    }
}

const handleDriverChange = (uid) => {
    console.log('[handleDriverChange]uid:', uid)
    if (!uid) return
    emit('update:filter', { key: 'uid', item: { value: uid, label: ' ' } })
}



onMounted(async () => {
    await waitForEnums()
})
</script>