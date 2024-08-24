<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  DialogClose,
  DialogContent,
  type DialogContentEmits,
  type DialogContentProps,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<DialogContentProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="[
        cn(
          'fixed left-0 bottom-0 md:bottom-10 z-50 w-full border bg-background p-6 shadow-lg',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:slide-out-to-bottom-[100%] data-[state=open]:slide-in-from-bottom-[100%]',
          'duration-300',
          'min-h-[50vh] max-h-[95vh] overflow-y-auto',
          'rounded-t-xl md:rounded-xl sm:max-w-lg sm:left-1/2 sm:-translate-x-1/2',
          props.class
        )
      ]"
    >
      <slot />

      <DialogClose
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X class="w-4 h-4" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>