export interface Option {
  label: string
  value: number
}

export type QuestionKind = 'normal' | 'drink_gate' | 'drink_trigger'

export interface Question {
  id: string
  dim: string | null
  kind: QuestionKind
  text: string
  options: Option[]
}

export interface PersonalityType {
  code: string
  cn: string
  intro: string
  desc: string
  image: string
  pattern?: string
  isSpecial: boolean
  oneLiner: string
  rarity: { percent: number; label: string }
}

export interface NormalTypePattern {
  code: string
  pattern: string
}

export interface DimensionMeta {
  dim: string
  name: string
  model: string
}

export interface DimensionExplanation {
  L: string
  M: string
  H: string
}

export interface Dimension {
  dim: string
  name: string
  model: string
  explanations: DimensionExplanation
}

export type Level = 'L' | 'M' | 'H'

export interface TestResult {
  rawScores: Record<string, number>
  levels: Record<string, Level>
  finalType: PersonalityType
  modeKicker: string
  badge: string
  sub: string
  special: boolean
  similarity: number
  exact: number
}
