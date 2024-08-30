<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px]">
      <PaymentPanel :record="record" />
    </DialogContent>
  </Dialog>
        <!-- <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-[600px] px-4 pt-8 max-h-[96dvh]">
          <DialogHeader>
            <DialogTitle>Create New Invoice</DialogTitle>
            <DialogDescription class="text-gray-500 mb-2">Fill in the details or use a template to create a new invoice.</DialogDescription>
          </DialogHeader>
          <div class="overflow-y-auto">
            <Tabs v-model="activeTab" class="w-full">
              <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="custom">Custom Invoice</TabsTrigger>
                <TabsTrigger value="uniuni">Uniuni Invoice</TabsTrigger>
              </TabsList>
              <TabsContent value="custom">
                <CustomInvoiceForm 
                  :customers="customers"
                  @submit="handleCreateInvoice"
                  @cancel="showCreateModal = false"
                />
              </TabsContent>
              <TabsContent value="uniuni">
                <UniuniTemplateForm
                  :customers="customers"
                  @submit="handleCheckInvoice"
                  @cancel="showCreateModal = false"
                />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog> -->
</template>

<script setup lang="ts">
import PaymentPanel from './PaymentPanel.vue';
import type { ReadablePaymentRecord } from '~/utils/driver';

const props = defineProps<{
  open: boolean;
  record: ReadablePaymentRecord;
}>();
const open = ref(false);
const record = computed(() => props.record)
watch(props.open, (newVal) => {
  open.value = newVal;
}, { immediate: true });

</script>