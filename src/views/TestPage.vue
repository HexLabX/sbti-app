<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTest } from '@/composables/useTest'
import NavBar from '@/components/NavBar.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import DotIndicator from '@/components/DotIndicator.vue'

const router = useRouter()
const {
  startTest,
  currentIndex,
  answers,
  visibleQuestions,
  totalQuestions,
  currentQuestion,
  answeredCount,
  progress,
  isLastQuestion,
  nextQuestion,
  prevQuestion,
  submitTest,
} = useTest()

const direction = ref<'left' | 'right'>('left')
const touchStartX = ref(0)
const touchStartY = ref(0)

const answeredIds = computed(() => {
  const set = new Set<string>()
  visibleQuestions.value.forEach((q, i) => {
    if (answers[q.id] !== undefined) {
      set.add(String(i))
    }
  })
  return set
})

const currentSelected = computed(() => {
  const q = currentQuestion.value
  if (!q) return undefined
  return answers[q.id]
})

function handleSelect(value: number) {
  const q = currentQuestion.value
  if (!q) return
  answers[q.id] = value
}

function handleNext() {
  if (!currentQuestion.value) return
  if (answers[currentQuestion.value.id] === undefined) return
  if (isLastQuestion.value) {
    submitTest()
    router.push('/result')
  } else {
    direction.value = 'left'
    nextQuestion()
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    direction.value = 'right'
    prevQuestion()
  }
}

// Touch swipe handlers — only horizontal swipes, ignore vertical scrolls
function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
}

function onTouchEnd(e: TouchEvent) {
  const deltaX = e.changedTouches[0].clientX - touchStartX.value
  const deltaY = e.changedTouches[0].clientY - touchStartY.value
  // Only trigger swipe if horizontal movement clearly dominates vertical
  if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
    if (deltaX < 0) {
      handleNext()
    } else {
      handlePrev()
    }
  }
}

// Keyboard navigation
function onKeydown(e: KeyboardEvent) {
  if (!currentQuestion.value) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault()
    handleNext()
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault()
    handlePrev()
  } else if (e.key >= '1' && e.key <= '4') {
    const idx = parseInt(e.key) - 1
    const opt = currentQuestion.value.options[idx]
    if (opt) {
      handleSelect(opt.value)
    }
  }
}

onMounted(() => {
  startTest()
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div
    class="min-h-screen bg-primary-page dark:bg-dark-bg flex flex-col transition-colors duration-200"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <!-- Top bar with back button and progress -->
    <div class="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-dark-bg/80 border-b border-gray-100 dark:border-dark-card">
      <div class="max-w-xl mx-auto px-4 pt-3">
        <div class="flex items-center justify-between mb-2">
          <button
            @click="router.push('/')"
            class="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400
                   hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            首页
          </button>
        </div>
        <ProgressBar
          :progress="progress"
          :current="currentIndex"
          :total="totalQuestions"
        />
      </div>
    </div>

    <!-- Question area -->
    <div class="flex-1 flex items-start justify-center px-4 pt-6 md:pt-8 overflow-auto">
      <Transition :name="direction === 'left' ? 'slide-left' : 'slide-right'" mode="out-in">
        <div v-if="currentQuestion" :key="currentQuestion.id" class="w-full">
          <QuestionCard
            :question="currentQuestion"
            :selected-value="currentSelected"
            @select="handleSelect"
          />
        </div>
      </Transition>
    </div>

    <!-- Navigation buttons -->
    <div class="max-w-xl mx-auto w-full px-4 pb-4 pt-2 safe-bottom">
      <div class="flex items-center justify-between gap-4">
        <button
          @click="handlePrev"
          :disabled="currentIndex === 0"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-200
                 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300
                 hover:bg-gray-50 dark:hover:bg-dark-card
                 disabled:opacity-30 disabled:cursor-not-allowed
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          上一题
        </button>

        <button
          @click="handleNext"
          :disabled="currentQuestion && answers[currentQuestion.id] === undefined"
          class="px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200
                 bg-primary hover:bg-primary/90 text-white
                 disabled:opacity-40 disabled:cursor-not-allowed
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          {{ isLastQuestion ? '查看结果' : '下一题' }}
        </button>
      </div>
    </div>

    <!-- Dot indicator -->
    <div class="pb-4 pt-1 safe-bottom">
      <DotIndicator
        :total="totalQuestions"
        :current="currentIndex"
        :answered-ids="answeredIds"
      />
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
