<script setup lang="ts">
import { computed } from 'vue'
import { allTypes } from '@/data/types'
import NavBar from '@/components/NavBar.vue'
import TypeCard from '@/components/TypeCard.vue'

// Sort by rarity: most common first, special types last
const normalTypes = computed(() =>
  allTypes.filter(t => !t.isSpecial).sort((a, b) => b.rarity.percent - a.rarity.percent)
)

const specialTypes = computed(() =>
  allTypes.filter(t => t.isSpecial)
)
</script>

<template>
  <div class="min-h-screen bg-primary-page dark:bg-dark-bg transition-colors duration-200">
    <NavBar :show-nav="true" />

    <main class="max-w-5xl mx-auto px-4 py-8">
      <!-- Header -->
      <section class="text-center mb-8">
        <h1 class="text-2xl md:text-3xl font-bold text-primary dark:text-primary-light">
          SBTI 人格百科
        </h1>
        <p class="mt-2 text-gray-500 dark:text-gray-400">
          探索全部 {{ allTypes.length }} 种SBTI人格类型
        </p>
      </section>

      <!-- Normal types grid -->
      <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        <TypeCard
          v-for="type in normalTypes"
          :key="type.code"
          :type="type"
        />
      </section>

      <!-- Special types section -->
      <section v-if="specialTypes.length > 0">
        <h2 class="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          特殊人格
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <TypeCard
            v-for="type in specialTypes"
            :key="type.code"
            :type="type"
          />
        </div>
      </section>
    </main>
  </div>
</template>
