export const Checkbox = ({ 
  label, 
  error, 
  register, 
  name,
  description,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={name}
            type="checkbox"
            className={`w-4 h-4 text-primary-600 bg-white border-secondary-300 rounded focus:ring-primary-500 focus:ring-2 ${className}`}
            {...(register ? register(name) : {})}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label htmlFor={name} className="font-medium text-secondary-700">
              {label}
            </label>
          )}
          {description && (
            <p className="text-secondary-500">{description}</p>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Checkbox
