<script setup lang="ts">
const props = defineProps<{
  total: number
  current: number
  answeredIds: Set<string>
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-1 flex-wrap max-h-8 overflow-hidden px-2">
    <div
      v-for="(_, index) in props.total"
      :key="index"
      class="rounded-full transition-all duration-150"
      :class="index === props.current
        ? 'w-4 h-1.5 bg-primary dark:bg-primary-light'
        : props.answeredIds.has(String(index))
          ? 'w-1.5 h-1.5 bg-primary/60 dark:bg-primary-light/60'
          : 'w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600'"
    />
  </div>
</template>
