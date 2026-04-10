import type { Question, Level, TestResult, PersonalityType } from '@/types'
import { dimensionOrder } from '@/data/dimensions'
import { normalTypeList, normalTypes, typeLibrary } from '@/data/types'

function sumToLevel(score: number): Level {
  if (score <= 3) return 'L'
  if (score === 4) return 'M'
  return 'H'
}

function levelNum(level: Level): number {
  return { L: 1, M: 2, H: 3 }[level]
}

function parsePattern(pattern: string): Level[] {
  return pattern.replace(/-/g, '').split('') as Level[]
}

export function computeResult(
  answers: Record<string, number>,
  regularQuestions: Question[],
): TestResult {
  const rawScores: Record<string, number> = {}
  const levels: Record<string, Level> = {}

  // Initialize all dimensions to 0
  dimensionOrder.forEach(dim => { rawScores[dim] = 0 })

  // Sum question values per dimension
  regularQuestions.forEach(q => {
    if (q.dim && answers[q.id] !== undefined) {
      rawScores[q.dim] += answers[q.id]
    }
  })

  // Convert to L/M/H
  dimensionOrder.forEach(dim => {
    levels[dim] = sumToLevel(rawScores[dim])
  })

  // Build user vector
  const userVector = dimensionOrder.map(dim => levelNum(levels[dim]))

  // Manhattan distance vs 25 normal type patterns
  const ranked = normalTypeList.map(type => {
    const vector = parsePattern(type.pattern).map(levelNum)
    let distance = 0
    let exact = 0
    for (let i = 0; i < vector.length; i++) {
      const diff = Math.abs(userVector[i] - vector[i])
      distance += diff
      if (diff === 0) exact += 1
    }
    const similarity = Math.max(0, Math.round((1 - distance / 30) * 100))
    return { ...type, distance, exact, similarity }
  }).sort((a, b) => {
    if (a.distance !== b.distance) return a.distance - b.distance
    if (b.exact !== a.exact) return b.exact - a.exact
    return b.similarity - a.similarity
  })

  const bestNormal = ranked[0]
  const drunkTriggered = answers['drink_gate_q2'] === 2

  let finalType: PersonalityType
  let modeKicker: string
  let badge: string
  let sub: string
  let special: boolean

  if (drunkTriggered) {
    finalType = typeLibrary.DRUNK
    modeKicker = '隐藏人格已激活'
    badge = '匹配度 100% · 酒精异常因子已接管'
    sub = '乙醇亲和性过强，系统已直接跳过常规人格审判。'
    special = true
  } else if (bestNormal.similarity < 60) {
    finalType = typeLibrary.HHHH
    modeKicker = '系统强制兜底'
    badge = `标准人格库最高匹配仅 ${bestNormal.similarity}%`
    sub = '标准人格库对你的脑回路集体罢工了，于是系统把你强制分配给了 HHHH。'
    special = true
  } else {
    const normalType = normalTypes[bestNormal.code]
    finalType = normalType
    modeKicker = '你的主类型'
    badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/15 维`
    sub = '维度命中度较高，当前结果可视为你的第一人格画像。'
    special = false
  }

  return {
    rawScores,
    levels,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    similarity: bestNormal.similarity,
    exact: bestNormal.exact,
  }
}
