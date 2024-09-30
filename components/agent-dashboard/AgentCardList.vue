<template>
    <Card class="h-full">
        <CardHeader class="p-3">
            <CardTitle class="text-lg text-primary">Active Agents</CardTitle>
        </CardHeader>
        <CardContent class="p-3 pt-0">
            <ScrollArea class="h-[calc(100%-2rem)]">
                <div class="space-y-2">
                    <div v-for="agent in agents" :key="agent.id"
                        class="bg-muted rounded-md p-2 flex justify-between items-center">
                        <div>
                            <h3 class="font-semibold text-xs">{{ agent.name }}</h3>
                            <p class="text-xs text-muted-foreground">ID: {{ agent.id }}</p>
                        </div>
                        <Badge variant="secondary" class="text-xs">${{ agent.cost }}</Badge>
                    </div>
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

defineProps<{
    agents: Array<{
        id: string;
        name: string;
        cost: number;
    }>
}>();
</script>