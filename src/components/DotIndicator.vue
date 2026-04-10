<script setup lang="ts">
const props = defineProps<{
  total: number
  current: number
  answeredIds: Set<string>
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-1.5 flex-wrap px-4">
    <div
      v-for="(_, index) in props.total"
      :key="index"
      class="rounded-full transition-all duration-200"
      :class="index === props.current
        ? 'w-5 h-2 bg-primary dark:bg-primary-light'
        : props.answeredIds.has(String(index))
          ? 'w-2 h-2 bg-primary dark:bg-primary-light'
          : 'w-2 h-2 bg-gray-300 dark:bg-gray-600'"
    />
  </div>
</template>
