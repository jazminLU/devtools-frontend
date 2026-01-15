/**
 * Reusable form textarea component.
 * 
 * Implements Single Responsibility Principle - handles only textarea rendering.
 */
import PropTypes from 'prop-types'

function FormTextarea({ id, label, value, onChange, rows = 3, required = false, className = '', ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={rows}
        required={required}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
        {...props}
      />
    </div>
  )
}

FormTextarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rows: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
}

export default FormTextarea

