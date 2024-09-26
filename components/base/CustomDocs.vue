<template>
  <div>
    <ContentDoc v-slot="{ doc }">
      <article class="prose prose-sm sm:prose lg:prose-base mx-auto">
        <h1>{{ doc.title }} {{ path }}</h1>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  path: {
    type: String,
    default: 'docs/index'
  }
})

const emit = defineEmits(['loaded'])

const { data: doc, pending, error } = await useAsyncData(
  `content-${props.path}`,
  () => queryContent(props.path).findOne()
)

watch(doc, (newDoc: any) => {
  if (newDoc) {
    emit('loaded', newDoc)
  }
})
</script>
