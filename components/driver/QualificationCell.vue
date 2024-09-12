<template>
    <div class="flex space-x-0 border border-border rounded-lg">
        <TooltipProvider v-for="item in qualificationItems" :key="item.name">
            <Tooltip>
                <TooltipTrigger>
                    <div
                        :class="['flex items-center justify-center group cursor-pointer border-r border-border py-2 px-2.5', item.isVerified ? 'opacity-85' : 'opacity-25']">
                        <Icon :name="item.icon" class="w-4 h-4"></Icon>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{{ item.tooltipText }}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ReadableDriver, QualificationIcon } from '~/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps<{
    qualification: ReadableDriver['qualification']
    icons: QualificationIcon[]
}>()

const qualificationItems = computed(() =>
    props.icons.map((item) => ({
        ...item,
        isVerified: props.qualification[item.name as keyof ReadableDriver['qualification']],
        tooltipText: `${item.tooltip}: ${props.qualification[item.name as keyof ReadableDriver['qualification']] ? 'Verified' : 'Not Verified'}`
    }))
)
</script>