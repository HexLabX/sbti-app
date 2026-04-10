<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allTypes } from '@/data/types'
import { dimensionOrder, dimensionMeta, dimExplanations, dimensions } from '@/data/dimensions'
import NavBar from '@/components/NavBar.vue'
import ShareButton from '@/components/ShareButton.vue'

const route = useRoute()
const router = useRouter()

const code = decodeURIComponent(route.params.code as string)
const type = computed(() => allTypes.find(t => t.code === code))

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

function levelBadgeColor(level: string): string {
  if (level === 'H') return 'bg-primary text-white'
  if (level === 'M') return 'bg-primary-light text-white'
  return 'bg-primary-lighter text-primary dark:text-dark-text'
}

// Parse dimension pattern for normal types
const parsedDimensions = computed(() => {
  const t = type.value
  if (!t || t.isSpecial || !t.pattern) return []

  const levels = t.pattern.replace(/-/g, '').split('')
  return dimensionOrder.map((dim, i) => ({
    dim,
    name: dimensionMeta[dim].name,
    model: dimensionMeta[dim].model,
    level: levels[i],
    explanation: dimExplanations[dim][levels[i] as 'L' | 'M' | 'H'],
  }))
})

// Group by model
const modelGroups = computed(() => {
  const groups: Record<string, typeof parsedDimensions.value> = {}
  for (const d of parsedDimensions.value) {
    if (!groups[d.model]) groups[d.model] = []
    groups[d.model].push(d)
  }
  return Object.entries(groups)
})

const isNotFound = computed(() => !type.value)
</script>

<template>
  <div class="min-h-screen bg-primary-page dark:bg-dark-bg transition-colors duration-200">
    <NavBar :show-nav="true" />

    <!-- 404 state -->
    <main v-if="isNotFound" class="max-w-2xl mx-auto px-4 py-20 text-center">
      <p class="text-6xl mb-4">?</p>
      <h1 class="text-xl font-bold text-gray-800 dark:text-dark-text mb-2">
        未找到人格 "{{ code }}"
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mb-6">
        请检查链接是否正确，或返回百科页面浏览全部人格。
      </p>
      <router-link
        to="/wiki"
        class="inline-flex items-center gap-1 text-primary dark:text-primary-light text-sm font-medium hover:underline"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回百科
      </router-link>
    </main>

    <!-- Type detail -->
    <main v-else-if="type" class="max-w-2xl mx-auto px-4 py-8">
      <!-- Back to wiki -->
      <button
        @click="router.push('/wiki')"
        class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400
               hover:text-primary dark:hover:text-primary-light transition-colors mb-6"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        返回百科
      </button>

      <!-- Large poster -->
      <section class="text-center mb-8">
        <!-- Type image -->
        <div class="w-40 h-40 mx-auto mb-4 rounded-2xl overflow-hidden bg-white dark:bg-dark-card shadow-sm border border-gray-100 dark:border-gray-700/50">
          <img
            :src="getImageUrl(type.image)"
            :alt="type.code"
            class="w-full h-full object-contain"
            @error="handleImgError"
          />
          <div class="w-full h-full items-center justify-center text-primary dark:text-primary-light font-bold text-3xl hidden">
            {{ type.code }}
          </div>
        </div>

        <h1 class="text-3xl font-bold text-gray-800 dark:text-dark-text">{{ type.code }}</h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mt-1">{{ type.cn }}</p>

        <!-- Intro quote -->
        <p class="mt-3 text-sm italic text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
          "{{ type.intro }}"
        </p>

        <!-- Rarity badge -->
        <div class="mt-3 flex items-center justify-center gap-2">
          <span
            class="text-xs font-medium px-3 py-1 rounded-full"
            :class="rarityColor(type.rarity.label)"
          >
            {{ type.rarity.label }} · {{ type.rarity.percent }}%
          </span>
        </div>
      </section>

      <!-- OneLiner -->
      <div class="bg-white dark:bg-dark-card rounded-xl p-5 border border-gray-100 dark:border-gray-700/50 mb-6">
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ type.oneLiner }}
        </p>
      </div>

      <!-- Dimension table (normal types only) -->
      <section v-if="!type.isSpecial" class="mb-8">
        <h2 class="text-lg font-bold text-gray-800 dark:text-dark-text mb-4">维度模板</h2>
        <div class="space-y-6">
          <div v-for="[model, dims] in modelGroups" :key="model">
            <h3 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
              {{ model }}
            </h3>
            <div class="bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
              <div
                v-for="d in dims"
                :key="d.dim"
                class="flex items-center px-4 py-3 border-b border-gray-50 dark:border-gray-700/30 last:border-0"
              >
                <span class="text-sm text-gray-700 dark:text-gray-300 flex-1">{{ d.name }}</span>
                <span
                  class="w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full"
                  :class="levelBadgeColor(d.level)"
                >
                  {{ d.level }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Special type note -->
      <div v-else class="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-5 border border-purple-100 dark:border-purple-900/20 mb-8">
        <p class="text-sm text-purple-700 dark:text-purple-300">
          特殊人格没有固定的维度模板
        </p>
      </div>

      <!-- Full description (collapsible) -->
      <details class="mb-8 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-gray-700/50 overflow-hidden">
        <summary class="px-5 py-4 cursor-pointer text-sm font-bold text-gray-700 dark:text-dark-text hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors select-none">
          查看完整描述
        </summary>
        <div class="px-5 pb-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {{ type.desc }}
        </div>
      </details>

      <!-- Share button -->
      <div class="flex justify-center mb-8">
        <ShareButton
          :title="`SBTI人格: ${type.code} (${type.cn})`"
          :text="type.intro"
        />
      </div>
    </main>
  </div>
</template>
