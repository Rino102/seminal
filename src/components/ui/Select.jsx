export default function Select({ label, value, onChange, options = [], disabled }) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">{label}</label>
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
  