<template>
    <Drawer :open="!!record" @close="$emit('close')" class="w-full md:w-1/2 h-[50vh]">
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Delivery Details</DrawerTitle>
            </DrawerHeader>
            <div class="p-4">
                <div v-for="(value, key) in record" :key="key" class="mb-2">
                    <strong class="text-sm text-muted-foreground uppercase">{{ key }}:</strong> {{ value }}
                </div>
            </div>
        </DrawerContent>
    </Drawer>
</template>

<script lang="ts" setup>
import type { DeliveryRecordView } from '~/types'

defineProps<{
    record: DeliveryRecordView | null;
}>();

defineEmits<{
    (e: 'close'): void;
}>();
</script>