<script setup lang="ts">
import type { Question } from '@/types'

defineProps<{
  question: Question
  selectedValue: number | undefined
}>()

const emit = defineEmits<{
  select: [value: number]
}>()

const letters = ['A', 'B', 'C', 'D'] as const

function handleKeydown(e: KeyboardEvent, value: number) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('select', value)
  }
}
</script>

<template>
  <div class="w-full max-w-xl mx-auto">
    <!-- Question text -->
    <p class="text-base md:text-lg text-gray-800 dark:text-dark-text leading-relaxed mb-6 text-center">
      {{ question.text }}
    </p>

    <!-- Options -->
    <div class="flex flex-col gap-3">
      <button
        v-for="(option, index) in question.options"
        :key="option.value"
        @click="emit('select', option.value)"
        @keydown="handleKeydown($event, option.value)"
        :aria-checked="selectedValue === option.value"
        role="radio"
        tabindex="0"
        class="flex items-start gap-3 w-full p-4 rounded-xl text-left
               border-2 transition-all duration-200
               focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        :class="selectedValue === option.value
          ? 'border-primary bg-primary-bg dark:bg-primary/10 dark:border-primary-light'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card hover:border-primary-lighter dark:hover:border-gray-600 hover:shadow-sm'"
      >
        <!-- Letter prefix -->
        <span
          class="w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold flex-shrink-0 mt-0.5 transition-colors"
          :class="selectedValue === option.value
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-dark-bg text-gray-500 dark:text-gray-400'"
        >
          {{ letters[index] ?? '?' }}
        </span>

        <!-- Option label -->
        <span
          class="text-sm md:text-base leading-relaxed pt-0.5"
          :class="selectedValue === option.value
            ? 'text-primary dark:text-primary-light font-medium'
            : 'text-gray-700 dark:text-gray-300'"
        >
          {{ option.label }}
        </span>
      </button>
    </div>
  </div>
</template>
