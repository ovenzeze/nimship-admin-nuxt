<template>
    <ContentDoc>
        <template #default="{ doc }">
            <article class="prose prose-sm sm:prose lg:prose-lg dark:prose-invert mx-auto">
                <!-- <h1 class="text-3xl font-bold mb-4">{{ doc.title }}</h1> -->
                <ContentRenderer :value="doc" />
            </article>
        </template>
        <template #not-found>
            <div class="text-center py-16">
                <h2 class="text-2xl font-semibold mb-4">Document Not Found</h2>
                <p class="text-muted-foreground mb-8">
                    Sorry, we couldn't find the document you're looking for.
                </p>
                <NuxtLink to="/docs"
                    class="inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Return to Documentation Home
                </NuxtLink>
            </div>
        </template>
    </ContentDoc>
</template>


<script setup lang="ts">

definePageMeta({
    layout: 'docs',
})
const route = useRoute()

const docsPath = computed(() => {
    // Remove leading slash and ensure path starts with 'docs/'
    const cleanPath = route.path.replace(/^\//, '')
    if (!cleanPath.startsWith('docs/')) {
        return 'docs/404' // Return a 404 page path if not in docs directory
    }

    // Remove 'docs/' prefix and add 'index' for root docs path
    const docPath = cleanPath.replace(/^docs\//, '') || 'index'

    // Ensure the path doesn't try to access parent directories
    if (docPath.includes('..')) {
        return 'docs/404'
    }

    return `docs/${docPath}`
})

// You can remove the watch and useAsyncData logic from here
// as ContentDoc handles the data fetching internally
</script>