/**
 * Result card component for displaying success results.
 * 
 * Implements Single Responsibility Principle - handles only result display.
 */
import PropTypes from 'prop-types'

function ResultCard({ result }) {
  if (!result) return null

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-6 ${
      result.type === 'success' ? 'border-l-4 border-green-500' : ''
    }`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Result</h3>
      {result.word && (
        <div className="mb-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">Word: </span>
          <span className="text-gray-900 dark:text-white">{result.word}</span>
        </div>
      )}
      {result.definition && (
        <div className="mb-2">
          <span className="font-medium text-gray-700 dark:text-gray-300">Definition: </span>
          <span className="text-gray-900 dark:text-white">{result.definition}</span>
        </div>
      )}
      {result.message && (
        <p className="text-gray-900 dark:text-white">{result.message}</p>
      )}
    </div>
  )
}

ResultCard.propTypes = {
  result: PropTypes.object,
}

export default ResultCard

