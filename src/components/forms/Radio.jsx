export const Radio = ({ 
  label, 
  error, 
  register, 
  name,
  options = [],
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label}
        </label>
      )}
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              value={option.value}
              className="w-4 h-4 text-primary-600 bg-white border-secondary-300 focus:ring-primary-500 focus:ring-2"
              {...(register ? register(name) : {})}
              {...props}
            />
            <label 
              htmlFor={`${name}-${option.value}`} 
              className="ml-3 text-sm font-medium text-secondary-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  )
}

export default Radio
