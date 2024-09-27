<template>
    <Card class="h-full flex flex-col">
        <CardHeader class="p-3 flex-shrink-0">
            <div class="flex justify-between items-center">
                <CardTitle class="text-lg text-primary">Chat History</CardTitle>
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-muted-foreground">Real-time updates</span>
                    <Switch v-model="realTimeUpdates" />
                </div>
            </div>
        </CardHeader>
        <CardContent class="px-6 pt-0 flex-grow overflow-hidden text-xs">
            <ScrollArea class="h-full">
                <div class="space-y-6">
                    <div v-for="message in messages" :key="message.timestamp" :class="[
                        'flex',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                    ]">
                        <div :class="[
                            'max-w-[70%] rounded-md p-2 shadow-sm',
                            getMessageStyle(message.role)
                        ]">
                            <p class="text-xs font-semibold mb-1">{{ getNickname(message.role) }}</p>
                            <p class="text-sm">{{ message.content }}</p>
                            <p class="text-xs text-right mt-1 opacity-70">
                                {{ new Date(message.timestamp).toLocaleString() }}
                            </p>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

const props = defineProps<{
    messages: Array<{
        role: string;
        content: string;
        timestamp: string;
    }>
}>();

const realTimeUpdates = ref(true);

// Preset configurations for chat styling
const presetStyles = {
    user: { bg: 'bg-blue-100', text: 'text-blue-800', shadow: 'shadow-blue-200' },
    agent: { bg: 'bg-green-100', text: 'text-green-800', shadow: 'shadow-green-200' },
    system: { bg: 'bg-gray-100', text: 'text-gray-800', shadow: 'shadow-gray-200' },
    assistant: { bg: 'bg-purple-100', text: 'text-purple-800', shadow: 'shadow-purple-200' },
    default: { bg: 'bg-gray-100', text: 'text-gray-800', shadow: 'shadow-gray-200' }
} as const;

type PresetStyleKey = keyof typeof presetStyles;

// Function to get nickname based on role
const getNickname = (role: string): string => {
    const nicknames: { [key: string]: string } = {
        user: 'You',
        agent: 'Agent',
        system: 'System',
        assistant: 'Assistant',
        'Jack SDE': 'Jack SDE',
        'Claude 3.5': 'Claude 3.5',
        'Clay PM': 'Clay PM',
        'gpt-4-mini': 'GPT-4 Mini'
    };
    return nicknames[role] || role;
};

// Function to get message style based on role
const getMessageStyle = (role: string): string => {
    const key = (role.toLowerCase() as PresetStyleKey) in presetStyles
        ? (role.toLowerCase() as PresetStyleKey)
        : 'default';
    const style = presetStyles[key];
    return `${style.bg} ${style.text} ${style.shadow}`;
};

onMounted(() => {
    scrollToBottom();
});

const scrollToBottom = () => {
    nextTick(() => {
        const scrollArea = document.querySelector('.scroll-area-viewport');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
        }
    });
};

// Watch for changes in messages and scroll to bottom if realTimeUpdates is true
watch(() => props.messages, () => {
    if (realTimeUpdates.value) {
        scrollToBottom();
    }
}, { deep: true });
</script>