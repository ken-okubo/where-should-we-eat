// components/OptionList.jsx
function OptionList({ options, highlightedIndex, winner, showBlink, handleDelete, spinning }) {
    return (
      <ul className="space-y-1 text-gray-800">
        {options.map((opt, index) => {
          const isHighlighted = index === highlightedIndex
          const isWinner = opt === winner && showBlink
  
          return (
            <li
              key={index}
              className={`flex justify-between items-center px-3 py-2 rounded shadow-sm border transition
                ${isWinner ? 'bg-green-500 text-white font-extrabold ring-2 ring-green-700 scale-110 animate-blink' : ''}
                ${isHighlighted && !isWinner ? 'bg-yellow-300 font-bold' : ''}
                ${!isHighlighted && !isWinner ? 'bg-white' : ''}
              `}
            >
              <span>{opt}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-sm text-red-500 hover:text-red-700"
                disabled={spinning}
              >
                Delete
              </button>
            </li>
          )
        })}
      </ul>
    )
  }
  
  export default OptionList
  