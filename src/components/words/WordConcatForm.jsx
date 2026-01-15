/**
 * Word concatenation form component.
 * 
 * Implements Single Responsibility Principle - handles only form UI.
 */
import PropTypes from 'prop-types'
import FormTextarea from '../common/FormTextarea'
import SubmitButton from '../common/SubmitButton'

function WordConcatForm({ words, onWordsChange, onSubmit, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Word Concatenation Tool</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Concatenates the n-th letter of each word, where n is the index of the word (0-based).
        For example: ["hello", "world"] → "hw" (h from index 0, w from index 1).
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormTextarea
          id="words"
          label="Words (comma or newline separated)"
          value={words}
          onChange={(e) => onWordsChange(e.target.value)}
          rows={5}
          placeholder="hello, world"
          required
        />
        <SubmitButton loading={loading} loadingText="Processing...">
          Concatenate
        </SubmitButton>
      </form>
    </div>
  )
}

WordConcatForm.propTypes = {
  words: PropTypes.string.isRequired,
  onWordsChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default WordConcatForm

