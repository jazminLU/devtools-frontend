/**
 * Dictionary tool component.
 * 
 * Implements Single Responsibility Principle - handles only dictionary functionality.
 * Uses dependency injection for API service (Dependency Inversion).
 */
import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import { createApiService } from '../services/apiService'
import { useAsyncOperation } from '../hooks/useAsyncOperation'
import { isNotEmpty } from '../utils/validation'
import { SUCCESS_MESSAGES } from '../utils/constants'
import WordForm from './dictionary/WordForm'
import WordSearch from './dictionary/WordSearch'
import ResultCard from './common/ResultCard'
import ErrorCard from './common/ErrorCard'

function DictionaryTool({ apiUrl }) {
  const [word, setWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [result, setResult] = useState(null)
  
  const apiService = useMemo(() => createApiService(apiUrl), [apiUrl])
  const { loading, error, execute, resetError } = useAsyncOperation()

  const handleAddWord = async (e) => {
    e.preventDefault()
    resetError()
    setResult(null)

    if (!isNotEmpty(word) || !isNotEmpty(definition)) {
      return
    }

    await execute(
      () => apiService.dictionary.add(word.trim(), definition.trim()),
      (data) => {
        setResult({ type: 'success', message: data.message || SUCCESS_MESSAGES.WORD_ADDED(word) })
        setWord('')
        setDefinition('')
      }
    )
  }

  const handleSearchWord = async (e) => {
    e.preventDefault()
    resetError()
    setResult(null)

    if (!isNotEmpty(searchWord)) {
      return
    }

    await execute(
      () => apiService.dictionary.get(searchWord.trim()),
      (data) => {
        setResult({
          type: 'success',
          word: data.word,
          definition: data.definition,
        })
      }
    )
  }

  return (
    <div className="space-y-6">
      <WordForm
        word={word}
        definition={definition}
        onWordChange={setWord}
        onDefinitionChange={setDefinition}
        onSubmit={handleAddWord}
        loading={loading}
      />

      <WordSearch
        searchWord={searchWord}
        onSearchWordChange={setSearchWord}
        onSubmit={handleSearchWord}
        loading={loading}
      />

      {result && <ResultCard result={result} />}
      {error && <ErrorCard error={error} />}
    </div>
  )
}

DictionaryTool.propTypes = {
  apiUrl: PropTypes.string.isRequired,
}

export default DictionaryTool

