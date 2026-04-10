<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

useTheme()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
  <footer class="text-center py-6 text-xs text-gray-400 dark:text-gray-500">
    © 2026 <a href="https://www.hex-coder.icu/about" target="_blank" rel="noopener" class="hover:text-primary dark:hover:text-primary-light transition-colors">十六</a>
  </footer>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
