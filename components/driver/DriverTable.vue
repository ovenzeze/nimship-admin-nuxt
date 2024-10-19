<template>
    <div class="flex-1  h-full  flex flex-col overflow-hidden relative">
        <div v-if="loading"
            class="absolute top-0 right-0 h-full w-full flex items-center content-center z-30 bg-background/25 animate-in fade-in-20 backdrop-blur-sm">
            <Icon name="ph:spinner" class="w-8 h-8 animate-spin flex-1" />
        </div>
        <UTable :rows="drivers" :columns="visibleColumns" v-model:sort="localSort" :loading="loading"
            @select="selectRow" :ui="tableStyle" class="flex-1 w-full m-0 sticky-header relative">

            <template #empty-state>
                <div class=" w-[90vw] text-center py-6 gap-3 pt-28">
                    <span class="italic text-primary-foreground">No Records</span>
                </div>
            </template>
            <!-- Table cell templates -->
            <template #team_name-data="{ row }">
                <!-- <UPopover>
                    <div class="w-full flex flex-row items-center justify-center">
                        <UBadge :label="row.team_name" color="zinc" variant="outline" class="rounded-full px-3" />
                    </div>
                    <template #panel> -->
                <div class="min-w-full flex flex-row items-center justify-center">
                    <FilterItem key="team" :config="teamConfig" :modelValue="row.team_name" :lazy=true
                        @update:modelValue="($event) => updateField('team_name', $event, row)" />
                </div>
                <!-- </template>
</UPopover> -->
            </template>

            <template #first_name-data="{ row }">
                <p class="uppercase">{{ row.first_name + " " + row.last_name }}</p>
            </template>

            <template #enroll_time-data="{ row }">
                <p class="uppercase">{{ formatDate(row.enroll_time) }}</p>
            </template>

            <template #warehouse-data="{ row }">
                <div class="flex flex-row items-center justify-center cursor-pointer">
                    <FilterItem key="warehouse_id" :config="warehouseConfig" :modelValue="row.warehouse" :lazy=true
                        @update:modelValue="($event) => updateField('warehouse', $event, row)" />
                </div>
            </template>

            <template #driver_id-data="{ row }">
                <div class="flex flex-row items-center justify-center gap-x-1"
                    v-if="row.driver_id && row.driver_id.length">
                    <UBadge :label="id" color="zinc" variant="outline" v-for="id in row.driver_id"
                        class="rounded-full px-3" />
                </div>
                <div v-else>
                    <UBadge label="N/A" color="red" variant="outline" class="rounded-full px-3 opacity-50" />

                </div>
            </template>

            <template #driver_type-data="{ row }">
                <div class="w-full flex flex-row items-center justify-center">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UBadge :label="row.driver_type" color="amber" variant="subtle"
                            :ui="{ rounded: 'rounded-full' }" class="cursor-pointer" />
                        <template #content>
                            <div class="p-4 w-64">
                                <USelect v-model="row.driver_type" :options="driverTypeOptions"
                                    @update:model-value="updateField('driver_type', $event, row)" />
                            </div>
                        </template>
                    </UPopover>
                </div>
            </template>

            <template #status-data="{ row }">
                <div class="flex flex-row items-center justify-center">
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UBadge size="sm" :label="row.status" :color="getStatusColor(row.status)" variant="subtle"
                            class="uppercase rounded-full cursor-pointer" />
                        <template #content>
                            <div class="p-4 w-64">
                                <USelect v-model="row.status" :options="statusOptions"
                                    @update:model-value="updateField('status', $event, row)" />
                            </div>
                        </template>
                    </UPopover>
                </div>
            </template>

            <template #last_update-data="{ row }">
                {{ formatDate(row.last_update) }}
            </template>

            <template #mail_street-data="{ row }">
                <p v-if="row.mail_street" class="uppercase">{{ row.mail_street }}</p>
                <p v-if="row.mail_city" class="uppercase">{{ row.mail_city }} {{ row.mail_state }} {{ row.mail_zip }}
                </p>
                <p v-if="!row.mail_street" class="uppercase text-red-300">N/A</p>
            </template>

            <template #actions-data="{ row }">
                <div class="mx-auto px-1 h-full sticky-action">
                    <UButton icon="i-ph-caret-down-thin" size="xs" color="primary" variant="soft"
                        :ui="{ rounded: 'rounded-full' }" square @click="$emit('edit', row)" />
                </div>
            </template>
        </UTable>
    </div>
</template>

<script setup lang="ts">
import { EnumType, type HaulblazeContact } from '~/types'
import { columns, tableStyle, getStatusColor, formatDate } from './driver.table.config'

const { isMobile } = useDevice()

const props = defineProps<{
    drivers: HaulblazeContact[]
    loading: boolean
    sort: { column: string; direction: 'asc' | 'desc' }
}>()


const emit = defineEmits<{
    (e: 'update:sort', sort: { column: string; direction: 'asc' | 'desc' }): void
    (e: 'edit', driver: HaulblazeContact): void
    (e: 'update:field', update: Partial<HaulblazeContact>): void
}>()

// const warehouse

const warehouseConfig = {
    type: 'select' as const,
    key: 'warehouse_id',
    placeholder: 'Warehouse',
    enumType: EnumType.WAREHOUSE_CODE,
    as: 'button'
}

const driverConfig = {
    key: 'driver_id',
    placeholder: 'Driver Id',
    enumType: EnumType.DRIVER_ID,
}

const payCyleConfig = {
    key: 'cycle_start',
    placeholder: 'Pay Cycle',
    enumType: EnumType.CYCLE,
    selectFirstOption: true
}

const teamConfig = {
    type: 'select' as const,
    key: 'team',
    placeholder: 'Team',
    enumType: EnumType.TEAM_NAME,
    selectFirstOption: true
}

function updateField(field: keyof HaulblazeContact, value: any, driver: HaulblazeContact) {
    console.log('[Driver][updateField]', field, value, driver.uid)
    emit('update:field', { uid: driver.uid, [field]: value })
}

const selectedRows = ref<HaulblazeContact[]>([])
const selectedColumns = ref(columns.map(col => col.key))
const visibleColumns = computed(() => columns.filter(col => selectedColumns.value.includes(col.key)))
const localSort = computed({ get: () => props.sort, set: (value) => emit('update:sort', value) })

function selectRow(row: HaulblazeContact) {
    const index = selectedRows.value.findIndex(item => item.uid === row.uid)
    if (index === -1) {
        selectedRows.value.push(row)
    } else {
        selectedRows.value.splice(index, 1)
    }
}
</script>

<style>
.sticky-header th {
    position: sticky;
    top: 0;
    z-index: 20;
}

.sticky-header td:has(.sticky-action) {
    position: sticky;
    z-index: 20;
    right: 0;
    top: 45px;
    padding-right: 0;
    padding-left: 0;
    height: 100%;
    /* background-color: hsl(var(--muted)); */
    /* --tw-backdrop-blur: blur(14px); */

    /* backdrop-filter: var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia); */
}
</style>
