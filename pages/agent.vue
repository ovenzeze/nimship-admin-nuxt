<template>
    <div class="min-h-screen bg-background flex flex-col">
        <div class="container mx-auto p-4 flex flex-col h-screen">
            <header class="flex-shrink-0 mb-4">
                <h1 class="text-2xl font-bold tracking-tight text-primary">Agent Dashboard</h1>
                <p class="text-sm text-muted-foreground">Monitor and manage agent tasks and communications.</p>
            </header>
            <div class="flex-grow flex flex-col pb-4 overflow-hidden space-y-12">
                <div class="flex-none h-1/4 grid grid-cols-3 gap-x-5 ">
                    <div class="col-span-2">
                        <TaskInfoCard :task="mockTask" />
                    </div>
                    <div class="col-span-1">
                        <AgentCardList :agents="mockAgents" />
                    </div>
                </div>
                <div class="flex-grow h-3/4 overflow-hidden">
                    <ChatHistory :messages="mockMessages" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import TaskInfoCard from '@/components/agent-dashboard/TaskInfoCard.vue';
import AgentCardList from '@/components/agent-dashboard/AgentCardList.vue';
import ChatHistory from '@/components/agent-dashboard/ChatHistory.vue';

// Mock data
const mockTask = {
    id: 'TASK-001',
    description: 'Analyze customer feedback and generate insights',
    complexity: 'High',
    status: 'In Progress',
    costLimit: 1000,
    currentCost: 450,
};

const mockAgents = [
    { id: 'AGENT-001', name: 'Data Analyst', cost: 200 },
    { id: 'AGENT-002', name: 'NLP Specialist', cost: 250 },
    { id: 'AGENT-003', name: 'Visualization Expert', cost: 150 },
];

const mockMessages: Array<{ role: 'user' | 'agent'; content: string; timestamp: string }> = [
    { role: 'user', content: 'Please start analyzing the customer feedback data.', timestamp: '2023-06-01T10:00:00Z' },
    { role: 'agent', content: 'Certainly! I\'ll begin by preprocessing the data and identifying key themes.', timestamp: '2023-06-01T10:05:00Z' },
    { role: 'agent', content: 'Initial analysis complete. Would you like a summary of the main findings?', timestamp: '2023-06-01T10:30:00Z' },
    { role: 'user', content: 'Yes, please provide a summary of the key insights.', timestamp: '2023-06-01T10:35:00Z' },
];
</script>