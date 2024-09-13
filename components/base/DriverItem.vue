<template>
  <div class="flex flex-col items-center w-full py-1 gap-y-1">
    <p class="w-full flex flex-row justify-between items-center">
      <span class="inline-block uppercase text-xs">{{ driver.first_name + " " +
        driver.last_name }}</span>
      <span class="uppercase text-xs text-muted-foreground">{{ driver.team_name }}</span>
    </p>
    <p class="w-full flex flex-row justify-between items-center uppercase text-xs">
      <span class="uppercase text-xs">{{ driver.driver_id?.join('|') || 'N/A' }}</span>
      <span class="uppercase text-xs text-muted-foreground">{{ driver.warehouse }}</span>
    </p>

  </div>
</template>

<script lang="ts" setup>
const props = defineProps({ driver: { type: Object as () => HaulblazeContact } })
</script>

<style></style>