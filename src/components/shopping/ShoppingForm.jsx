/**
 * Shopping calculation form component.
 * 
 * Implements Single Responsibility Principle - handles only shopping form.
 */
import PropTypes from 'prop-types'
import FormTextarea from '../common/FormTextarea'
import FormInput from '../common/FormInput'
import SubmitButton from '../common/SubmitButton'

function ShoppingForm({ costs, items, tax, onCostsChange, onItemsChange, onTaxChange, onSubmit, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Shopping Cost Calculator</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <FormTextarea
            id="costs"
            label="Item Costs (JSON or key:value format)"
            value={costs}
            onChange={(e) => onCostsChange(e.target.value)}
            rows={5}
            placeholder='{"apple": 1.50, "banana": 0.75, "orange": 2.00}'
            className="font-mono text-sm"
            required
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Format: JSON object or one item per line as "item: price"
          </p>
        </div>
        <FormTextarea
          id="items"
          label="Items to Calculate (comma or newline separated)"
          value={items}
          onChange={(e) => onItemsChange(e.target.value)}
          rows={3}
          placeholder="apple, banana, orange"
          required
        />
        <FormInput
          id="tax"
          label="Tax Rate (decimal, e.g., 0.1 for 10%)"
          type="number"
          value={tax}
          onChange={(e) => onTaxChange(e.target.value)}
          min="0"
          step="0.01"
          required
        />
        <SubmitButton loading={loading} loadingText="Calculating...">
          Calculate Total
        </SubmitButton>
      </form>
    </div>
  )
}

ShoppingForm.propTypes = {
  costs: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
  tax: PropTypes.string.isRequired,
  onCostsChange: PropTypes.func.isRequired,
  onItemsChange: PropTypes.func.isRequired,
  onTaxChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default ShoppingForm

