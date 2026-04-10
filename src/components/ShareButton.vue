<script setup lang="ts">
import { ref } from 'vue'
import { useShare } from '@/composables/useShare'

const props = defineProps<{
  title: string
  text: string
  url?: string
}>()

const { share } = useShare()
const showToast = ref(false)

async function handleShare() {
  const success = await share({
    title: props.title,
    text: props.text,
    url: props.url || window.location.href,
  })
  if (success) {
    showToast.value = true
    setTimeout(() => { showToast.value = false }, 2000)
  }
}
</script>

<template>
  <div class="relative inline-flex">
    <button
      @click="handleShare"
      class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
             bg-primary hover:bg-primary/90 text-white text-sm font-medium
             transition-colors duration-200
             focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <!-- Share icon -->
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      分享结果
    </button>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2
               bg-primary text-white text-sm rounded-full shadow-lg"
      >
        已复制到剪贴板
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 8px);
}
.toast-enter-to,
.toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>
