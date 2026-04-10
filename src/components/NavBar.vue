<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

defineProps<{ showNav?: boolean }>()

const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/test', label: '测试' },
  { to: '/wiki', label: '百科' },
]

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<template>
  <!-- Minimal back button mode -->
  <header
    v-if="showNav === false"
    class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-bg/80
           border-b border-gray-100 dark:border-dark-card"
  >
    <div class="max-w-5xl mx-auto px-4 h-12 flex items-center">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-1 text-sm text-gray-600 dark:text-dark-text
               hover:text-primary dark:hover:text-primary-light transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        首页
      </RouterLink>
    </div>
  </header>

  <!-- Full navigation mode -->
  <header
    v-else
    class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-bg/80
           border-b border-gray-100 dark:border-dark-card"
  >
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="text-xl font-bold text-primary dark:text-primary-light tracking-wide"
      >
        SBTI
      </RouterLink>

      <!-- Desktop nav links -->
      <nav class="hidden md:flex items-center gap-6">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="closeMobileMenu"
          class="text-sm font-medium transition-colors duration-200"
          :class="route.path === link.to
            ? 'text-primary dark:text-primary-light'
            : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light'"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Right side: theme toggle + hamburger -->
      <div class="flex items-center gap-2">
        <ThemeToggle />

        <!-- Hamburger button (mobile) -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden w-9 h-9 flex items-center justify-center rounded-full
                 hover:bg-primary-bg dark:hover:bg-dark-card transition-colors
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-5 h-5 text-gray-700 dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else class="w-5 h-5 text-gray-700 dark:text-dark-text" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile slide-down menu -->
    <Transition name="slide-down">
      <nav
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-100 dark:border-dark-card bg-white dark:bg-dark-bg"
      >
        <div class="px-4 py-3 flex flex-col gap-2">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="route.path === link.to
              ? 'bg-primary-bg dark:bg-dark-card text-primary dark:text-primary-light'
              : 'text-gray-600 dark:text-gray-400 hover:bg-primary-bg/50 dark:hover:bg-dark-card'"
          >
            {{ link.label }}
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.2s ease, opacity 0.2s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>
