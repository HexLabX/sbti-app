import { ref, computed, reactive } from 'vue'
import type { Question, TestResult } from '@/types'
import { regularQuestions, drinkGateQ1, drinkGateQ2 } from '@/data/questions'
import { computeResult } from '@/utils/scoring'
import { shuffle } from '@/utils/shuffle'

const shuffledQuestions = ref<Question[]>([])
const currentIndex = ref(0)
const answers = reactive<Record<string, number>>({})
const result = ref<TestResult | null>(null)
const testStarted = ref(false)

const visibleQuestions = computed<Question[]>(() => {
  const visible = [...shuffledQuestions.value]
  const gateIndex = visible.findIndex(q => q.id === 'drink_gate_q1')
  if (gateIndex !== -1 && answers['drink_gate_q1'] === 3) {
    visible.splice(gateIndex + 1, 0, drinkGateQ2)
  }
  return visible
})

const totalQuestions = computed(() => visibleQuestions.value.length)
const currentQuestion = computed(() => visibleQuestions.value[currentIndex.value] ?? null)
const answeredCount = computed(() => visibleQuestions.value.filter(q => answers[q.id] !== undefined).length)
const progress = computed(() => totalQuestions.value > 0 ? answeredCount.value / totalQuestions.value : 0)
const isAllAnswered = computed(() => answeredCount.value === totalQuestions.value && totalQuestions.value > 0)
const isLastQuestion = computed(() => currentIndex.value === totalQuestions.value - 1)

function startTest() {
  const questions = [...regularQuestions]
  // Insert drink gate question at a random position in the last third
  const insertIndex = Math.floor(questions.length * (2 / 3)) + Math.floor(Math.random() * (questions.length * (1 / 3)))
  questions.splice(insertIndex, 0, drinkGateQ1)
  shuffledQuestions.value = shuffle(questions)
  currentIndex.value = 0
  Object.keys(answers).forEach(k => delete answers[k])
  result.value = null
  testStarted.value = true
}

function selectAnswer(questionId: string, value: number) {
  answers[questionId] = value

  // Handle drink gate logic
  if (questionId === 'drink_gate_q1' && value !== 3) {
    delete answers['drink_gate_q2']
  }
}

function nextQuestion() {
  if (!isLastQuestion.value) {
    currentIndex.value++
  }
}

function prevQuestion() {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

function submitTest() {
  result.value = computeResult(answers, regularQuestions)
}

function resetTest() {
  shuffledQuestions.value = []
  currentIndex.value = 0
  Object.keys(answers).forEach(k => delete answers[k])
  result.value = null
  testStarted.value = false
}

export function useTest() {
  return {
    testStarted,
    shuffledQuestions,
    currentIndex,
    answers,
    result,
    visibleQuestions,
    totalQuestions,
    currentQuestion,
    answeredCount,
    progress,
    isAllAnswered,
    isLastQuestion,
    startTest,
    selectAnswer,
    nextQuestion,
    prevQuestion,
    submitTest,
    resetTest,
  }
}
