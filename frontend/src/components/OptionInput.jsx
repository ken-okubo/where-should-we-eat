// components/OptionInput.jsx
function OptionInput({ option, setOption, handleAdd, spinning }) {
    return (
      <div className="flex gap-2">
        <input
          value={option}
          onChange={(e) => setOption(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd()
            }
          }}
          type="text"
          placeholder="Type a restaurant or cuisine..."
          className="flex-1 px-2 py-2 rounded border border-gray-300"
          disabled={spinning}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          disabled={spinning}
        >
          +
        </button>
      </div>
    )
  }
  
  export default OptionInput
  