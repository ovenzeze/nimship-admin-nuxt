<template>
    <Card class="h-full">
        <CardHeader class="p-3">
            <CardTitle class="text-lg text-primary">Task Information</CardTitle>
        </CardHeader>
        <CardContent class="p-3 pt-0">
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="flex items-center space-x-2">
                    <Fingerprint class="h-4 w-4 text-muted-foreground" />
                    <span class="font-medium">{{ task.id }}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <BarChart2 class="h-4 w-4 text-muted-foreground" />
                    <span>{{ task.complexity }}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <Activity class="h-4 w-4 text-muted-foreground" />
                    <span>{{ task.status }}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <DollarSign class="h-4 w-4 text-muted-foreground" />
                    <span>${{ task.costLimit }}</span>
                </div>
                <div class="flex items-center space-x-2 col-span-2">
                    <Wallet class="h-4 w-4 text-muted-foreground" />
                    <span>Current Cost: ${{ task.currentCost }}</span>
                </div>
            </div>
            <div class="mt-2 text-xs">
                <span class="font-medium">Description:</span>
                <p class="mt-1">{{ task.description }}</p>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, BarChart2, Activity, DollarSign, Wallet } from 'lucide-vue-next';

defineProps<{
    task: {
        id: string;
        description: string;
        complexity: string;
        status: string;
        costLimit: number;
        currentCost: number;
    }
}>();
</script>