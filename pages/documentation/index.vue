<template>
    <main class="container mx-auto px-4 py-8 max-w-3xl">
        <article class="prose prose-sm sm:prose lg:prose-base mx-auto">
            <CustomContent />
        </article>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
    auth: false,
    title: "Documentation",
    description: "NIMSHIP Documentation",
});

useHead({
    title: 'Documentation | NIMSHIP',
    meta: [
        { name: 'description', content: 'NIMSHIP Documentation' },
        { property: 'og:title', content: 'Documentation | NIMSHIP' },
        { property: 'og:description', content: 'NIMSHIP Documentation' },
        { name: 'twitter:title', content: 'Documentation | NIMSHIP' },
        { name: 'twitter:description', content: 'NIMSHIP Documentation' },
    ],
});
</script>

<style lang="postcss">
.prose {
    @apply text-zinc-700 leading-relaxed text-sm sm:text-base;

    /* Headings */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        @apply text-zinc-700;
    }

    h1 {
        @apply text-2xl sm:text-3xl font-bold mb-6 pb-1 border-b border-zinc-200;
    }

    h2 {
        @apply text-xl sm:text-2xl font-semibold mt-8 mb-4;
    }

    h3 {
        @apply text-lg sm:text-xl font-medium mt-6 mb-3;
    }

    /* Paragraphs and lists */
    p,
    ul,
    ol {
        @apply my-4;
    }

    ul,
    ol {
        @apply pl-6;
    }

    ul {
        @apply list-disc;
    }

    ol {
        @apply list-decimal;
    }

    li {
        @apply mb-1;
    }

    /* Links */
    a {
        @apply text-zinc-600 transition-colors duration-200 ease-in-out;

        &:hover {
            @apply text-zinc-800;
        }
    }

    /* Blockquotes */
    blockquote {
        @apply border-l-4 border-zinc-300 pl-4 italic my-6 py-1 text-zinc-600;
    }

    /* Code blocks */
    code {
        @apply bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800;
    }

    pre {
        @apply bg-zinc-100 p-3 rounded-lg my-6 overflow-x-auto text-sm;

        code {
            @apply bg-transparent p-0 text-zinc-800;
        }
    }

    /* Tables */
    table {
        @apply w-full my-6 border-collapse;

        th,
        td {
            @apply border border-zinc-300 px-3 py-1 text-left;
        }

        th {
            @apply bg-zinc-100 font-semibold;
        }
    }

    /* Images */
    img {
        @apply max-w-full h-auto rounded-lg my-6;
    }

    /* Custom content */
    .notice {
        @apply bg-zinc-50 border-l-4 border-zinc-500 p-3 my-4 rounded-r-lg;

        p {
            @apply text-zinc-700 m-0;
        }
    }

    /* Responsive adjustments */
    @screen sm {
        @apply text-base;
    }

    @screen lg {
        @apply text-base;
    }
}
</style>