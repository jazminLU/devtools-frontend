/**
 * Word search component.
 * 
 * Implements Single Responsibility Principle - handles only word search form.
 */
import PropTypes from 'prop-types'
import FormInput from '../common/FormInput'
import SubmitButton from '../common/SubmitButton'

function WordSearch({ searchWord, onSearchWordChange, onSubmit, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Search Word</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          id="searchWord"
          label="Word to Search"
          value={searchWord}
          onChange={(e) => onSearchWordChange(e.target.value)}
          required
        />
        <SubmitButton loading={loading} loadingText="Searching...">
          Search
        </SubmitButton>
      </form>
    </div>
  )
}

WordSearch.propTypes = {
  searchWord: PropTypes.string.isRequired,
  onSearchWordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default WordSearch

