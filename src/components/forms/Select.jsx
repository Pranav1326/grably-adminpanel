export const Select = ({ 
  label, 
  error, 
  register, 
  name, 
  options = [],
  placeholder = 'Select an option',
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-secondary-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        className={`input-base ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...(register ? register(name) : {})}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Select
