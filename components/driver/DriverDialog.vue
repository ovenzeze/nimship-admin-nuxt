<template>
    <UModal :modelValue="true" @close="$emit('close')">
        <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        {{ driver ? 'Edit Driver' : 'Add New Driver' }}
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="$emit('close')" />
                </div>
            </template>

            <UForm :state="formState" @submit="saveDriver">
                <UFormGroup label="First Name">
                    <UInput v-model="formState.first_name" />
                </UFormGroup>
                <UFormGroup label="Last Name">
                    <UInput v-model="formState.last_name" />
                </UFormGroup>
                <UFormGroup label="Driver ID">
                    <UInput v-model="formState.driver_id" />
                </UFormGroup>
                <UFormGroup label="Warehouse">
                    <USelect v-model="formState.warehouse" :options="warehouseOptions" />
                </UFormGroup>
                <UFormGroup label="Phone">
                    <UInput v-model="formState.phone" />
                </UFormGroup>
                <UFormGroup label="Email">
                    <UInput v-model="formState.email" type="email" />
                </UFormGroup>
                <UFormGroup label="Status">
                    <USelect v-model="formState.status" :options="statusOptions" />
                </UFormGroup>
                <UFormGroup label="Driver Type">
                    <USelect v-model="formState.driver_type" :options="driverTypeOptions" />
                </UFormGroup>

                <template #footer>
                    <div class="flex justify-end gap-x-4">
                        <UButton color="gray" variant="soft" @click="$emit('close')">
                            Cancel
                        </UButton>
                        <UButton type="submit" color="primary">
                            Save
                        </UButton>
                    </div>
                </template>
            </UForm>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { HaulblazeContact } from '~/types'

const props = defineProps<{
    driver?: HaulblazeContact | null
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'save', driver: HaulblazeContact): void
}>()

const formState = ref<Partial<HaulblazeContact>>({
    first_name: '',
    last_name: '',
    driver_id: '',
    warehouse: '',
    phone: '',
    email: '',
    status: '',
    driver_type: '',
})

// These options should be fetched from an API or store
const warehouseOptions = ref([])
const statusOptions = ref([])
const driverTypeOptions = ref([])

const saveDriver = () => {
    emit('save', formState.value as HaulblazeContact)
}

onMounted(() => {
    if (props.driver) {
        formState.value = { ...props.driver }
    }
})
</script>