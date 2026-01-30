// We add "error" and "...props" (which catches things like onChange, value, name)
export default function Input({ icon, type = "text", placeholder, error, ...props }) {
  return (
    <div className="w-full"> 
      {/* Dynamic border color: red if there's an error, gray otherwise */}
      <div className={`flex items-center gap-3 border rounded-lg px-3 py-2 transition-colors 
        ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus-within:border-blue-500'}`}
      >
        <span className={`${error ? 'text-red-400' : 'text-gray-400'}`}>
          {icon}
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full outline-none bg-transparent text-sm"
          {...props} // This spreads value and onChange onto the actual <input>
        />
      </div>
      
      {/* Error Message Display */}
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}