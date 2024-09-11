<template>
    <Dialog :open="true" @update:open="$emit('close')">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ driver ? 'Edit Driver' : 'Add New Driver' }}</DialogTitle>
                <DialogDescription>
                    <!-- {{ driver ? 'Make changes to the driver here. Click save when you\'re done.' : 
                    'Enter the details for the new driver.' }} -->
                </DialogDescription>
            </DialogHeader>
            <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
                <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="first_name" class="text-right">First Name</Label>
                        <Field name="first_name" id="first_name" :value="driver?.first_name">
                            <Input placeholder="First Name" />
                        </Field>
                        <ErrorMessage name="first_name" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="last_name" class="text-right">Last Name</Label>
                        <Field name="last_name" id="last_name" :value="driver?.last_name">
                            <Input placeholder="Last Name" />
                        </Field>
                        <ErrorMessage name="last_name" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="email" class="text-right">Email</Label>
                        <Field name="email" id="email" :value="driver?.email">
                            <Input placeholder="Email" type="email" />
                        </Field>
                        <ErrorMessage name="email" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="phone" class="text-right">Phone</Label>
                        <Field name="phone" id="phone" :value="driver?.phone">
                            <Input placeholder="Phone" type="tel" />
                        </Field>
                        <ErrorMessage name="phone" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="driver_type" class="text-right">Driver Type</Label>
                        <Field name="driver_type" id="driver_type" :value="driver?.driver_type">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select driver type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="type in driverTypes" :key="type.value" :value="type.value">
                                        {{ type.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <ErrorMessage name="driver_type" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="status" class="text-right">Status</Label>
                        <Field name="status" id="status" :value="driver?.status">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="status in statuses" :key="status.value" :value="status.value">
                                        {{ status.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <ErrorMessage name="status" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="team_name" class="text-right">Team</Label>
                        <Field name="team_name" id="team_name" :value="driver?.team_name">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select team" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="team in teams" :key="team.value" :value="team.value">
                                        {{ team.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <ErrorMessage name="team_name" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="warehouse" class="text-right">Warehouse</Label>
                        <Field name="warehouse" id="warehouse" :value="driver?.warehouse">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select warehouse" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="warehouse in warehouses" :key="warehouse.value"
                                        :value="warehouse.value">
                                        {{ warehouse.label }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                        <ErrorMessage name="warehouse" class="text-red-500 col-span-2" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="available" class="text-right">Available</Label>
                        <Field name="available" id="available" type="checkbox" :value="driver?.available">
                            <Switch />
                        </Field>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEnums } from '~/composables/useEnums'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { EnumType } from '~/types/shared'
import type { HaulblazeContact } from '~/types'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'

const props = defineProps<{
    driver?: HaulblazeContact | null
}>()

const emit = defineEmits<{
    close: []
    save: [driver: HaulblazeContact]
}>()

const { getEnumsByType } = useEnums()

const driverTypes = ref(getEnumsByType(EnumType.DRIVER_TYPE))
const statuses = ref(getEnumsByType(EnumType.STATUS))
const teams = ref(getEnumsByType(EnumType.TEAM_NAME))
const warehouses = ref(getEnumsByType(EnumType.WAREHOUSE_CODE))

const schema = toTypedSchema(z.object({
    uid: z.string().optional(),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    driver_type: z.string().min(1, 'Driver type is required'),
    status: z.string().min(1, 'Status is required'),
    team_name: z.string().min(1, 'Team is required'),
    warehouse: z.string().min(1, 'Warehouse is required'),
    available: z.boolean().optional(),
}))

const onSubmit = (values: HaulblazeContact) => {
    const updatedDriver = props.driver ? { ...props.driver, ...values } : values
    emit('save', updatedDriver)
}
</script>