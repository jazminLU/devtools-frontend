/**
 * Tab navigation component.
 * 
 * Implements Single Responsibility Principle - handles only tab navigation UI.
 * Open/Closed Principle - extensible for new tabs.
 */
import PropTypes from 'prop-types'

const TAB_LABELS = {
  dictionary: 'Dictionary',
  shopping: 'Shopping Calculator',
  words: 'Word Concatenation',
}

function TabNavigation({ activeTab, onTabChange, tabs }) {
  const tabEntries = Object.entries(tabs)

  return (
    <div className="mb-6">
      <nav className="flex space-x-4" aria-label="Tabs">
        {tabEntries.map(([key, value]) => (
          <TabButton
            key={key}
            tabKey={value}
            label={TAB_LABELS[value]}
            isActive={activeTab === value}
            onClick={() => onTabChange(value)}
          />
        ))}
      </nav>
    </div>
  )
}

TabNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  tabs: PropTypes.object.isRequired,
}

function TabButton({ tabKey, label, isActive, onClick }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors'
  const activeClasses = 'bg-blue-600 text-white'
  const inactiveClasses = 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </button>
  )
}

TabButton.propTypes = {
  tabKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TabNavigation

