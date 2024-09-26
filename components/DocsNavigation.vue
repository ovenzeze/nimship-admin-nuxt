<template>
    <nav class="docs-navigation">
        <ul v-if="navigation && navigation.length > 0" class="space-y-2">
            <li v-for="(item, index) in navigation" :key="index">
                <NuxtLink :to="item.path"
                    class="block py-2 px-4 rounded-md text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                    :class="{ 'font-semibold': isActive(item.path) }">
                    {{ item.title }}
                </NuxtLink>
                <ul v-if="item.children" class="ml-4 mt-2 space-y-2">
                    <li v-for="(child, childIndex) in item.children" :key="childIndex">
                        <NuxtLink :to="child.path"
                            class="block py-1 px-4 rounded-md text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-200"
                            :class="{ 'font-semibold': isActive(child.path) }">
                            {{ child.title }}
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
        <p v-else class="text-gray-600 dark:text-gray-400">Loading navigation...</p>
    </nav>
</template>

<script setup lang="ts">

interface NavItem {
    title: string
    path: string
    children?: NavItem[]
}

const navigation = ref<NavItem[]>([])
const route = useRoute()

onMounted(async () => {
    try {
        const { data, error } = await useFetch('/api/docs-navigation')
        if (error.value) {
            console.error('Failed to fetch navigation:', error.value)
            return
        }
        navigation.value = data.value as NavItem[]
    } catch (e) {
        console.error('An error occurred while fetching navigation:', e)
    }
})

const isActive = (path: string) => {
    return route.path === path
}
</script>

<style scoped>
.docs-navigation {
    @apply font-sans text-base;
}
</style>