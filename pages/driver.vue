
<template>
  <!-- 保留之前的代码 -->

  <!-- 移动端详情模态框 -->
  <Dialog v-model:open="showMobileDetailsModal">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Driver Details</DialogTitle>
      </DialogHeader>
      <div v-if="selectedDriver">
        <div v-for="(value, key) in selectedDriver" :key="key" class="mb-4">
          <label class="font-bold">{{ key }}:</label>
          <div v-if="isEditableDropdown(key)">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline" class="w-full justify-start">
                  {{ formatCellValue(selectedDriver, key) }}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  v-for="option in getDropdownOptions(key)"
                  :key="option.value"
                  @click="updateDriverField(selectedDriver, key, option.value)"
                >
                  {{ option.label }}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div v-else>
            {{ formatCellValue(selectedDriver, key) }}
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button @click="closeMobileDetailsModal">Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
// ... 保留之前的导入和函数 ...

// 更新 closeMobileDetailsModal 函数
const closeMobileDetailsModal = () => {
  showMobileDetailsModal.value = false
  selectedDriver.value = null
  fetchRecords() // 刷新数据以确保显示最新的更改
}

// ... 保留其他代码 ...
</script>
