export const Input = ({ 
  label, 
  error, 
  register, 
  name, 
  type = 'text', 
  placeholder,
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
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`input-base ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        {...(register ? register(name) : {})}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Input
