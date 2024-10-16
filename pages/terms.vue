<script setup lang="ts">
definePageMeta({
  layout: 'public',
  auth: false
})
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <article class=" sm:prose-sm md:prose lg:prose-lg xl:prose-xl mx-auto">
      <ContentDoc />
    </article>
  </main>
</template>
