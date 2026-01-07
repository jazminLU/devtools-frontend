/**
 * Word concatenation result component.
 * 
 * Implements Single Responsibility Principle - handles only result display.
 */
import PropTypes from 'prop-types'

function WordConcatResult({ result }) {
  if (!result) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Result</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Words:</p>
          <p className="text-gray-900 dark:text-white font-mono">{result.words.join(', ')}</p>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Concatenated Result:</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">{result.result}</p>
        </div>
        {result.result === '' && (
          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-2">
            Note: Some words were too short to extract characters at their index positions.
          </p>
        )}
      </div>
    </div>
  )
}

WordConcatResult.propTypes = {
  result: PropTypes.object,
}

export default WordConcatResult

