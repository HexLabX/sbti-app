<script setup lang="ts">
import type { Dimension, Level } from '@/types'

defineProps<{
  dim: Dimension
  level: Level
  rawScore: number
}>()

function barWidth(level: Level): string {
  if (level === 'H') return 'w-full'
  if (level === 'M') return 'w-2/3'
  return 'w-1/3'
}

function barColor(level: Level): string {
  if (level === 'H') return 'bg-primary'
  if (level === 'M') return 'bg-primary-light'
  return 'bg-primary-lighter'
}

function levelBadgeColor(level: Level): string {
  if (level === 'H') return 'bg-primary text-white'
  if (level === 'M') return 'bg-primary-light text-white'
  return 'bg-primary-lighter text-primary'
}
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Dimension name -->
    <span class="text-sm text-gray-700 dark:text-gray-300 w-28 flex-shrink-0 truncate" :title="dim.name">
      {{ dim.name }}
    </span>

    <!-- Bar track -->
    <div class="flex-1 h-2.5 bg-gray-100 dark:bg-dark-bg rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-500"
        :class="[barColor(level), barWidth(level)]"
      />
    </div>

    <!-- Level badge -->
    <span
      class="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full flex-shrink-0"
      :class="levelBadgeColor(level)"
    >
      {{ level }}
    </span>

    <!-- Raw score -->
    <span class="text-xs text-gray-400 dark:text-gray-500 w-8 text-right flex-shrink-0">
      {{ rawScore }}
    </span>
  </div>
</template>
