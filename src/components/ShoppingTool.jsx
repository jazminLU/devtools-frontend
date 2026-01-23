/**
 * Shopping calculator tool component.
 * 
 * Implements Single Responsibility Principle - handles only shopping calculation.
 * Uses dependency injection for API service (Dependency Inversion).
 */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTool } from '../hooks/useTool'
import { parseCosts, parseItems } from '../utils/parsers'
import { isPositive, isValidNumber } from '../utils/validation'
import ShoppingForm from './shopping/ShoppingForm'
import ShoppingResult from './shopping/ShoppingResult'
import ErrorCard from './common/ErrorCard'

const DEFAULT_TAX = '0.1'

function ShoppingTool({ apiUrl }) {
  const [costs, setCosts] = useState('')
  const [items, setItems] = useState('')
  const [tax, setTax] = useState(DEFAULT_TAX)
  const { apiService, loading, error, execute, resetError, result, setResult } = useTool(apiUrl)

  const handleCalculate = async (e) => {
    e.preventDefault()
    resetError()
    setResult(null)

    // Validate tax rate
    const taxRate = parseFloat(tax)
    if (!isValidNumber(tax) || !isPositive(taxRate)) {
      return
    }

    // Parse inputs
    const costsObj = parseCosts(costs)
    const itemsList = parseItems(items)

    if (itemsList.length === 0) {
      return
    }

    await execute(
      () => apiService.shopping.calculateTotal({
        costs: costsObj,
        items: itemsList,
        tax: taxRate,
      }),
      (data) => {
        setResult(data)
      }
    )
  }

  return (
    <div className="space-y-6">
      <ShoppingForm
        costs={costs}
        items={items}
        tax={tax}
        onCostsChange={setCosts}
        onItemsChange={setItems}
        onTaxChange={setTax}
        onSubmit={handleCalculate}
        loading={loading}
      />

      {result && <ShoppingResult result={result} />}
      {error && <ErrorCard error={error} />}
    </div>
  )
}

ShoppingTool.propTypes = {
  apiUrl: PropTypes.string.isRequired,
}

export default ShoppingTool
