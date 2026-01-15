/**
 * Custom hook for theme management.
 * 
 * Implements Single Responsibility Principle - handles only theme logic.
 * Provides abstraction for theme operations (Dependency Inversion).
 */
import { useState, useEffect } from 'react'

const THEME_STORAGE_KEY = 'theme'
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

/**
 * Hook to manage application theme (dark/light mode).
 * 
 * @returns {Object} Theme state and toggle function
 * @returns {boolean} returns.isDark - Current theme state
 * @returns {Function} returns.toggleTheme - Function to toggle theme
 */
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    return getInitialTheme()
  })

  useEffect(() => {
    applyTheme(isDark)
    persistTheme(isDark)
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return { isDark, toggleTheme }
}

/**
 * Get initial theme from storage or system preference.
 * 
 * @returns {boolean} Initial theme state
 */
function getInitialTheme() {
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (saved) {
    return saved === THEME_DARK
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Apply theme to document.
 * 
 * @param {boolean} isDark - Whether dark theme should be applied
 */
function applyTheme(isDark) {
  const root = document.documentElement
  if (isDark) {
    root.classList.add(THEME_DARK)
  } else {
    root.classList.remove(THEME_DARK)
  }
}

/**
 * Persist theme to localStorage.
 * 
 * @param {boolean} isDark - Theme state to persist
 */
function persistTheme(isDark) {
  localStorage.setItem(THEME_STORAGE_KEY, isDark ? THEME_DARK : THEME_LIGHT)
}

