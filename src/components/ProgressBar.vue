<script setup lang="ts">
defineProps<{
  progress: number
  current: number
  total: number
}>()
</script>

<template>
  <div class="w-full">
    <!-- Progress bar -->
    <div
      class="h-1 w-full bg-gray-100 dark:bg-dark-card rounded-full overflow-hidden"
      role="progressbar"
      :aria-valuenow="Math.round(progress * 100)"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        class="h-full rounded-full transition-all duration-300 ease-out"
        :style="{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }"
        style="background: linear-gradient(90deg, #a5c4a8, #4d6a53);"
      />
    </div>

    <!-- Step counter -->
    <p class="text-xs text-gray-400 dark:text-gray-500 text-center mt-1.5">
      {{ current + 1 }} / {{ total }}
    </p>
  </div>
</template>
