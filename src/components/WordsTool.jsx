/**
 * Word concatenation tool component.
 * 
 * Implements Single Responsibility Principle - handles only word concatenation.
 * Uses dependency injection for API service (Dependency Inversion).
 */
import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { createApiService } from '../services/apiService'
import { useAsyncOperation } from '../hooks/useAsyncOperation'
import { parseItems } from '../utils/parsers'
import WordConcatForm from './words/WordConcatForm'
import WordConcatResult from './words/WordConcatResult'
import ErrorCard from './common/ErrorCard'

function WordsTool({ apiUrl }) {
  const [words, setWords] = useState('')
  const [result, setResult] = useState(null)
  
  const apiService = useMemo(() => createApiService(apiUrl), [apiUrl])
  const { loading, error, execute, resetError } = useAsyncOperation()

  const handleConcatenate = async (e) => {
    e.preventDefault()
    resetError()
    setResult(null)

    const wordsList = parseItems(words)
    if (wordsList.length === 0) {
      return
    }

    await execute(
      () => apiService.words.concatenate(wordsList),
      (data) => {
        setResult(data)
      }
    )
  }

  return (
    <div className="space-y-6">
      <WordConcatForm
        words={words}
        onWordsChange={setWords}
        onSubmit={handleConcatenate}
        loading={loading}
      />

      {result && <WordConcatResult result={result} />}
      {error && <ErrorCard error={error} />}
    </div>
  )
}

WordsTool.propTypes = {
  apiUrl: PropTypes.string.isRequired,
}

export default WordsTool

