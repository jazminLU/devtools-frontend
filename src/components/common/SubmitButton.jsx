/**
 * Reusable submit button component.
 * 
 * Implements Single Responsibility Principle - handles only button rendering.
 */
import PropTypes from 'prop-types'

function SubmitButton({ children, loading, loadingText, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {loading ? loadingText : children}
    </button>
  )
}

SubmitButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
}

export default SubmitButton

