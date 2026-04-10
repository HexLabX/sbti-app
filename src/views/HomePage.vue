<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const router = useRouter()

function goTest() {
  router.push('/test')
}
function goWiki() {
  router.push('/wiki')
}
</script>

<template>
  <div class="min-h-screen bg-primary-page dark:bg-dark-bg transition-colors duration-200">
    <NavBar :show-nav="true" />

    <main class="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <!-- Hero section -->
      <section class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-primary dark:text-primary-light leading-tight">
          MBTI已经过时，SBTI来了
        </h1>
        <p class="mt-4 text-gray-600 dark:text-gray-400 text-lg">
          27种人格 · 15个维度 · 找到真实的你
        </p>
        <button
          @click="goTest"
          class="mt-8 bg-primary hover:bg-primary/90 text-white rounded-full
                 px-8 py-3 text-lg font-medium transition-colors duration-200
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          开始测试
        </button>
      </section>

      <!-- Feature cards -->
      <section class="grid md:grid-cols-2 gap-4 mb-12">
        <button
          @click="goTest"
          class="group p-6 rounded-xl bg-white dark:bg-dark-card shadow-sm
                 border border-gray-100 dark:border-gray-700/50
                 hover:shadow-md hover:border-primary-lighter dark:hover:border-primary-lighter/30
                 transition-all duration-200 text-left cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div class="w-10 h-10 rounded-full bg-primary-bg dark:bg-primary/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <line x1="9" y1="12" x2="15" y2="12" />
              <line x1="9" y1="16" x2="13" y2="16" />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
            开始测试
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            15道题，约3分钟，找出你的SBTI人格
          </p>
        </button>

        <button
          @click="goWiki"
          class="group p-6 rounded-xl bg-white dark:bg-dark-card shadow-sm
                 border border-gray-100 dark:border-gray-700/50
                 hover:shadow-md hover:border-primary-lighter dark:hover:border-primary-lighter/30
                 transition-all duration-200 text-left cursor-pointer
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div class="w-10 h-10 rounded-full bg-primary-bg dark:bg-primary/10 flex items-center justify-center mb-3">
            <svg class="w-5 h-5 text-primary dark:text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <h2 class="text-lg font-bold text-gray-800 dark:text-dark-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
            浏览人格百科
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            探索全部27种SBTI人格类型
          </p>
        </button>
      </section>

      <!-- Credits section -->
      <section class="p-5 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700/50">
        <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          致谢与声明
        </h3>
        <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>SBTI 测试原作者：B站@蛆肉儿串儿</li>
          <li>SBTI Wiki 原作者：sbti-wiki (CC BY-NC-SA 4.0)</li>
          <li>本站为基于上述项目的重构学习版本，仅供娱乐目的</li>
        </ul>
      </section>

      <!-- Disclaimer -->
      <p class="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
        本测试仅供娱乐，不构成任何心理评估
      </p>
    </main>
  </div>
</template>
