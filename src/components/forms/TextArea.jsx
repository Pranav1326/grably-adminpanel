export const TextArea = ({ 
  label, 
  error, 
  register, 
  name, 
  placeholder,
  required = false,
  rows = 4,
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
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`input-base ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className} resize-none`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default TextArea
