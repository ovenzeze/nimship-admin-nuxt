<template>
  <main class="container mx-auto px-4 py-8 max-w-4xl">
    <article class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
      <ContentDoc />
    </article>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "public",
  auth: false,
  title: "Privacy Policy",
  description: "Learn how we protect your privacy and personal information",
});
</script>

<style>
.prose {
  @apply text-gray-800 dark:text-gray-200;
}

.prose h1 {
  @apply text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700;
}

.prose h2 {
  @apply text-2xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4;
}

.prose h3 {
  @apply text-xl font-semibold text-gray-700 dark:text-gray-300 mt-6 mb-3;
}

.prose h4 {
  @apply text-lg font-medium text-gray-600 dark:text-gray-400 mt-4 mb-2;
}

.prose h5, .prose h6 {
  @apply text-base font-medium text-gray-500 dark:text-gray-500 mt-3 mb-2;
}

.prose a {
  @apply text-blue-600 dark:text-blue-400 hover:underline;
}

.prose ul, .prose ol {
  @apply my-4 list-disc list-inside;
}

.prose li {
  @apply mb-2;
}

.prose blockquote {
  @apply border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-6;
}

.prose code {
  @apply bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5;
}

.prose pre {
  @apply bg-gray-100 dark:bg-gray-800 rounded p-4 my-6 overflow-x-auto;
}

@media (max-width: 640px) {
  .prose {
    @apply text-sm;
  }
  
  .prose h1 {
    @apply text-2xl;
  }
  
  .prose h2 {
    @apply text-xl;
  }
  
  .prose h3 {
    @apply text-lg;
  }
  
  .prose h4, .prose h5, .prose h6 {
    @apply text-base;
  }
}
</style>