/**
 * Main application component.
 * 
 * Implements Single Responsibility Principle - handles only app-level concerns.
 * Uses composition and dependency injection for flexibility.
 */
import { useState } from 'react'
import DictionaryTool from './components/DictionaryTool'
import ShoppingTool from './components/ShoppingTool'
import WordsTool from './components/WordsTool'
import { useTheme } from './hooks/useTheme'
import ThemeToggle from './components/ThemeToggle'
import TabNavigation from './components/TabNavigation'

// Use /api proxy in production (Docker), or direct URL in development
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '/api' : 'http://localhost:8000')

const TABS = {
  DICTIONARY: 'dictionary',
  SHOPPING: 'shopping',
  WORDS: 'words',
}

function App() {
  const [activeTab, setActiveTab] = useState(TABS.DICTIONARY)
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">DevTools Playground v2</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                A collection of developer utilities
                {import.meta.env.VITE_APP_VERSION && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-mono">
                    v{import.meta.env.VITE_APP_VERSION}
                  </span>
                )}
              </p>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={TABS}
        />

        <div className="mt-6">
          {activeTab === TABS.DICTIONARY && <DictionaryTool apiUrl={API_BASE_URL} />}
          {activeTab === TABS.SHOPPING && <ShoppingTool apiUrl={API_BASE_URL} />}
          {activeTab === TABS.WORDS && <WordsTool apiUrl={API_BASE_URL} />}
        </div>
      </main>
    </div>
  )
}

export default App

