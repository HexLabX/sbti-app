import { ref, watchEffect } from 'vue'

const STORAGE_KEY = 'sbti-theme'

export function useTheme() {
  const isDark = ref(false)

  function applyTheme(dark: boolean) {
    isDark.value = dark
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  function initTheme() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      applyTheme(stored === 'dark')
      return
    }
    // Follow system preference on first visit
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(prefersDark)
  }

  function toggleTheme() {
    applyTheme(!isDark.value)
  }

  // Persist to localStorage whenever theme changes
  watchEffect(() => {
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  })

  initTheme()

  return { isDark, toggleTheme }
}
