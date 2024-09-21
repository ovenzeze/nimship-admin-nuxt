<template>
    <div class="documentation-page">
        <ContentDoc />
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`content-${route.path}`, () => queryContent('documentation', ...route.params.slug).findOne())

if (!data.value) {
    throw createError({ statusCode: 404, message: 'Page not found' })
}
</script>

<style scoped>
.documentation-page {
    @apply max-w-4xl mx-auto p-6;
}
</style>