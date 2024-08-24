<template>
  <div class="noscrollbar flex flex-row justify-start items-start relative  max-w-screen-xl min-h-[calc(100svh-30px)] overscroll-none">
    <iframe :src="`https://retool.nimship.com/app/${props.module}?mode=simple`"
      class="w-full absolute flex-1 no-scrollbar overflow-y-scroll overscroll-none min-h-[calc(100svh-30px)]" />

      <!-- Footer Block -->
    <!-- <div class="w-full bg-red-900 h-12 align-center place-items-center fixed bottom-0 right-0 z-40 pl-8">
    </div> -->
  </div>
</template>

<script setup lang="ts">

const props = defineProps(
  {
    module: { type: String, required: true },
    title: { type: String, required: true },
    bOffset: { type: Number, default: 20 },
    tOffset: { type: Number, default: 150 },
    loadingDuration: { type: Number, default: 0 }
  }
)

const isLoading = ref(false)


</script>