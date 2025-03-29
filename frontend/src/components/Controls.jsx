// components/Controls.jsx
function Controls({ handleSpin, handleReset, spinning }) {
    return (
      <div className="space-y-2">
        <button
        onClick={handleSpin}
        disabled={spinning}
        className={`w-full py-2 text-white font-semibold rounded transition 
            ${spinning ? 'bg-green-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
            🎰 Spin
        </button>
        <button
          onClick={handleReset}
          className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400"
          disabled={spinning}
        >
          🔄 Reset
        </button>
      </div>
    )
  }
  
  export default Controls
  