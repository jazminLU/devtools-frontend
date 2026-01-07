/**
 * Error card component for displaying errors.
 * 
 * Implements Single Responsibility Principle - handles only error display.
 */
import PropTypes from 'prop-types'

function ErrorCard({ error }) {
  if (!error) return null

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Error</h3>
      <p className="text-red-700 dark:text-red-300">{error}</p>
    </div>
  )
}

ErrorCard.propTypes = {
  error: PropTypes.string,
}

export default ErrorCard

