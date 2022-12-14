const InputControl = ({ label, type, placeholder, name, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-bold text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className="bg-transparent py-2 px-1 border border-gray-300 rounded"
        required
      />
    </div>
  )
}


export default InputControl