/**
 * Word concatenation tool component.
 * 
 * Implements Single Responsibility Principle - handles only word concatenation.
 * Uses dependency injection for API service (Dependency Inversion).
 */
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTool } from '../hooks/useTool'
import { parseItems } from '../utils/parsers'
import WordConcatForm from './words/WordConcatForm'
import WordConcatResult from './words/WordConcatResult'
import ErrorCard from './common/ErrorCard'

function WordsTool({ apiUrl }) {
  const [words, setWords] = useState('')
  const { apiService, loading, error, execute, resetError, result, setResult } = useTool(apiUrl)

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

