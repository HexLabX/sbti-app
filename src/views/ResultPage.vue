<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTest } from '@/composables/useTest'
import { dimensions } from '@/data/dimensions'
import NavBar from '@/components/NavBar.vue'
import DimBar from '@/components/DimBar.vue'
import ShareButton from '@/components/ShareButton.vue'

const router = useRouter()
const { result, resetTest } = useTest()

onMounted(() => {
  if (!result.value) {
    router.replace('/')
  }
})

const type = computed(() => result.value?.finalType)

function getImageUrl(imageName: string) {
  return new URL(`../assets/images/${imageName}`, import.meta.url).href
}

function handleImgError(e: Event) {
  const img = e.target as HTMLImageElement
  img.style.display = 'none'
  const fallback = img.nextElementSibling as HTMLElement
  if (fallback) fallback.style.display = 'flex'
}

function rarityColor(label: string): string {
  if (label === '极稀有') return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
  if (label === '稀有') return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
  return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
}

// Group dimensions by model
const modelGroups = computed(() => {
  if (!result.value) return []
  const groups: Record<string, typeof dimensions> = {}
  for (const dim of dimensions) {
    const model = dim.model
    if (!groups[model]) groups[model] = []
    groups[model].push(dim)
  }
  return Object.entries(groups)
})

function restartTest() {
  resetTest()
  router.push('/test')
}
</script>

<template>
  <div v-if="result && type" class="min-h-screen bg-primary-page dark:bg-dark-bg transition-colors duration-200">
    <NavBar :show-nav="true" />

    <main class="max-w-2xl mx-auto px-4 py-4 md:py-8 safe-bottom">
      <!-- Poster card -->
      <section class="rounded-2xl overflow-hidden shadow-lg mb-8">
        <!-- Gradient header -->
        <div class="bg-gradient-to-br from-primary to-primary-light p-5 md:p-8 text-center text-white">
          <!-- Type image -->
          <div class="w-36 h-36 md:w-44 md:h-44 mx-auto mb-3 md:mb-4 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center">
            <img
              :src="getImageUrl(type.image)"
              :alt="type.code"
              class="w-full h-full object-contain"
              @error="handleImgError"
            />
            <div
              class="absolute w-36 h-36 md:w-44 md:h-44 items-center justify-center text-4xl md:text-5xl font-bold hidden"
            >
              {{ type.code }}
            </div>
          </div>

          <!-- Code + Chinese name -->
          <h1 class="text-2xl md:text-3xl font-bold">{{ type.code }}</h1>
          <p class="text-lg md:text-xl mt-1 opacity-90">{{ type.cn }}</p>

          <!-- Intro quote -->
          <p class="mt-3 text-sm italic opacity-80 max-w-sm mx-auto leading-relaxed">
            "{{ type.intro }}"
          </p>

          <!-- Match badge -->
          <div class="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs">
            <span>{{ result.badge }}</span>
          </div>
        </div>

        <!-- Rarity + mode info -->
        <div class="bg-white dark:bg-dark-card p-4 flex items-center justify-between">
          <span
            class="text-xs font-medium px-3 py-1 rounded-full"
            :class="rarityColor(type.rarity.label)"
          >
            {{ type.rarity.label }} · {{ type.rarity.percent }}%
          </span>
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ result.modeKicker }}
          </span>
        </div>
      </section>

      <!-- OneLiner -->
      <p class="text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 mb-6 leading-relaxed">
        {{ type.oneLiner }}
      </p>

      <!-- Sub note -->
      <p class="text-xs text-gray-400 dark:text-gray-500 mb-6">
        {{ result.sub }}
      </p>

      <!-- Full description (collapsible) -->
      <details class="mb-8 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <summary class="px-5 py-4 cursor-pointer text-sm font-bold text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors select-none">
          查看完整描述
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ type.desc }}
        </div>
      </details>

      <!-- Dimension analysis -->
      <section class="mb-8">
        <h2 class="text-lg font-bold text-gray-800 dark:text-dark-text mb-4">
          维度分析
        </h2>

        <div class="space-y-6">
          <div v-for="[model, dims] in modelGroups" :key="model">
            <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {{ model }}
            </h3>
            <div class="space-y-2.5 bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-100 dark:border-gray-700/50">
              <DimBar
                v-for="dim in dims"
                :key="dim.dim"
                :dim="dim"
                :level="result.levels[dim.dim]"
                :raw-score="result.rawScores[dim.dim]"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Disclaimer -->
      <p class="text-xs text-gray-400 dark:text-gray-500 text-center mb-6">
        本测试仅供娱乐，不构成任何心理评估
      </p>

      <!-- Action buttons -->
      <div class="flex flex-wrap items-center justify-center gap-3">
        <button
          @click="restartTest"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200
                 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300
                 hover:bg-gray-50 dark:hover:bg-dark-card
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          重新测试
        </button>
        <button
          @click="router.push('/wiki')"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200
                 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300
                 hover:bg-gray-50 dark:hover:bg-dark-card
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          浏览百科
        </button>
        <ShareButton
          :title="`我的SBTI人格是 ${type.code} (${type.cn})`"
          :text="type.intro"
        />
      </div>
    </main>
  </div>
</template>
