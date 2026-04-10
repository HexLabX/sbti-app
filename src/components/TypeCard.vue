<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PersonalityType } from '@/types'

const props = defineProps<{ type: PersonalityType }>()

const router = useRouter()

function getImageUrl(imageName: string) {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

function handleImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  const fallback = img.nextElementSibling as HTMLElement
  if (fallback) fallback.style.display = 'flex'
}

function handleClick() {
  router.push(`/wiki/${encodeURIComponent(props.type.code)}`)
}

function rarityColor(label: string): string {
  if (label === '极稀有') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
  if (label === '稀有') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
}
</script>

<template>
  <button
    @click="handleClick"
    class="group relative flex flex-col items-center p-4 rounded-xl
           bg-white dark:bg-dark-card shadow-sm hover:shadow-md
           border border-gray-100 dark:border-gray-700/50
           hover:scale-[1.03] transition-all duration-200 cursor-pointer
           focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
  >
    <!-- Rarity badge -->
    <span
      class="absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full"
      :class="rarityColor(type.rarity.label)"
    >
      {{ type.rarity.label }}
    </span>

    <!-- Type image -->
    <div class="w-20 h-20 rounded-lg overflow-hidden bg-primary-bg dark:bg-dark-bg mb-3 flex-shrink-0">
      <img
        :src="getImageUrl(type.image)"
        :alt="type.code"
        loading="lazy"
        class="w-full h-full object-contain"
        @error="handleImgError"
      />
      <!-- Fallback -->
      <div
        class="w-full h-full items-center justify-center text-primary dark:text-primary-light
               font-bold text-lg hidden"
      >
        {{ type.code }}
      </div>
    </div>

    <!-- Code name -->
    <h3 class="text-sm font-bold text-gray-800 dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
      {{ type.code }}
    </h3>

    <!-- Chinese name -->
    <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
      {{ type.cn }}
    </p>
  </button>
</template>
