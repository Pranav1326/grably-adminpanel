export const Card = ({ title, children, className = '', action }) => {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default Card
