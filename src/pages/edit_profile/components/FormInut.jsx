const FormInput = ({ id, label, value, name, onChange, error, placeholder, disabled = false, helper = "" }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium mb-1">{label}</label>
    <input
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
        error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
      }`}
      placeholder={placeholder}
    />
    {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    {helper && !error && <p className="text-xs text-gray-500 mt-1">{helper}</p>}
  </div>
);

export default FormInput;