/**
 * Shopping calculation result component.
 * 
 * Implements Single Responsibility Principle - handles only result display.
 */
import PropTypes from 'prop-types'

function ShoppingResult({ result }) {
  if (!result) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Calculation Result</h3>
      <div className="space-y-2">
        <ResultRow label="Subtotal:" value={`$${result.subtotal.toFixed(2)}`} />
        <ResultRow label="Tax:" value={`$${result.tax_amount.toFixed(2)}`} />
        <ResultRow
          label="Total:"
          value={`$${result.total.toFixed(2)}`}
          isTotal
        />
        {result.items_found.length > 0 && (
          <ItemsList
            title="Items Found:"
            items={result.items_found}
            className="text-gray-600 dark:text-gray-400"
          />
        )}
        {result.items_not_found.length > 0 && (
          <ItemsList
            title="Items Not Found (ignored):"
            items={result.items_not_found}
            className="text-yellow-600 dark:text-yellow-500"
          />
        )}
      </div>
    </div>
  )
}

ShoppingResult.propTypes = {
  result: PropTypes.object,
}

function ResultRow({ label, value, isTotal = false }) {
  const containerClass = isTotal
    ? 'flex justify-between text-lg pt-2 border-t border-gray-200 dark:border-gray-700'
    : 'flex justify-between'
  const valueClass = isTotal
    ? 'font-bold text-blue-600 dark:text-blue-400'
    : 'font-medium text-gray-900 dark:text-white'

  return (
    <div className={containerClass}>
      <span className={isTotal ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}>
        {label}
      </span>
      <span className={valueClass}>{value}</span>
    </div>
  )
}

ResultRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isTotal: PropTypes.bool,
}

function ItemsList({ title, items, className }) {
  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{title}</p>
      <p className={`text-sm ${className}`}>{items.join(', ')}</p>
    </div>
  )
}

ItemsList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string.isRequired,
}

export default ShoppingResult

