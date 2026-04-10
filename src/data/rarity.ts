export const rarityData: Record<string, number> = {
  CTRL: 3.61,
  'ATM-er': 2.46,
  'Dior-s': 5.23,
  BOSS: 1.53,
  'THAN-K': 7.76,
  'OH-NO': 3.05,
  GOGO: 3.05,
  SEXY: 5.94,
  'LOVE-R': 4.23,
  MUM: 5.14,
  FAKE: 6.61,
  OJBK: 9.92,
  MALO: 5.71,
  'JOKE-R': 2.99,
  'WOC!': 2.04,
  'THIN-K': 2.24,
  SHIT: 2.53,
  ZZZZ: 4.68,
  POOR: 1.68,
  MONK: 2.8,
  IMSB: 4.21,
  SOLO: 3.72,
  FUCK: 3.38,
  DEAD: 2.5,
  IMFW: 2.12,
  HHHH: 0.06,
  DRUNK: 0.8,
}

export function getRarityLabel(percent: number): string {
  if (percent >= 5) return '常见'
  if (percent >= 2) return '稀有'
  return '极稀有'
}
