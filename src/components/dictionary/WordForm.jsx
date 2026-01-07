/**
 * Word form component for adding words.
 * 
 * Implements Single Responsibility Principle - handles only word addition form.
 */
import PropTypes from 'prop-types'
import FormInput from '../common/FormInput'
import FormTextarea from '../common/FormTextarea'
import SubmitButton from '../common/SubmitButton'

function WordForm({ word, definition, onWordChange, onDefinitionChange, onSubmit, loading }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Add Word</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          id="word"
          label="Word"
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
          required
        />
        <FormTextarea
          id="definition"
          label="Definition"
          value={definition}
          onChange={(e) => onDefinitionChange(e.target.value)}
          rows={3}
          required
        />
        <SubmitButton loading={loading} loadingText="Adding...">
          Add Word
        </SubmitButton>
      </form>
    </div>
  )
}

WordForm.propTypes = {
  word: PropTypes.string.isRequired,
  definition: PropTypes.string.isRequired,
  onWordChange: PropTypes.func.isRequired,
  onDefinitionChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default WordForm

