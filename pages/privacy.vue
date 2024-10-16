<template>
  <main class="container mx-auto px-4 py-8 max-w-3xl">
    <article class="prose lg:prose-base mx-auto">
      <CustomContent />
    </article>
  </main>
</template>

<script setup lang="ts">

definePageMeta({
  layout: "public",
  auth: false,
  title: "Privacy Policy",
  description: "Learn about how we collect, use, and protect your personal information",
});

useHead({
  title: 'Privacy Policy | NIMSHIP',
  meta: [
    { name: 'description', content: 'Learn about how we collect, use, and protect your personal information at NIMSHIP.' },
    { property: 'og:title', content: 'Privacy Policy | NIMSHIP' },
    { property: 'og:description', content: 'Learn about how we collect, use, and protect your personal information at NIMSHIP.' },
    { name: 'twitter:title', content: 'Privacy Policy | NIMSHIP' },
    { name: 'twitter:description', content: 'Learn about how we collect, use, and protect your personal information at NIMSHIP.' },
  ],
});
</script>
