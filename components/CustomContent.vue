<template>
  <ContentRenderer :value="data" :excerpt="excerpt" :tag="tag">
    <template #empty>
      <p>No content found.</p>
    </template>
    <template #not-found>
      <p>Document not found.</p>
    </template>
  </ContentRenderer>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'

const { data } = await useAsyncData('privacy-policy', () => queryContent('/privacy').findOne())

const excerpt = false
const tag = 'div'

const headingRenderer = (props: any) => {
  const tag = `h${props.node.depth}`
  const iconMap: Record<number, string> = {
    1: 'carbon:document-security',
    2: 'carbon:category',
    3: 'carbon:list-bulleted',
  }
  const icon = iconMap[props.node.depth] || ''

  return h(tag, { class: `custom-heading-${props.node.depth}` }, [
    h('Icon', { name: icon, class: 'mr-2' }),
    ...props.node.children
  ])
}

const tags = {
  h1: headingRenderer,
  h2: headingRenderer,
  h3: headingRenderer,
}
</script>