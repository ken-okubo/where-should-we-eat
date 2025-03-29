import { useState, useEffect } from 'react'
import Header from './components/Header'
import OptionInput from './components/OptionInput'
import OptionList from './components/OptionList'
import Controls from './components/Controls'
import {
  createSession,
  getOptions,
  addOption,
  deleteOption,
  spin,
} from './api'

function App() {
  const [option, setOption] = useState('')
  const [options, setOptions] = useState([])
  const [sessionId, setSessionId] = useState(null)
  const [winner, setWinner] = useState(null)
  const [highlightedIndex, setHighlightedIndex] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [showBlink, setShowBlink] = useState(false)

  const handleSpin = async () => {
    if (!sessionId || options.length < 2) return
  
    setSpinning(true)
    setWinner(null)
    setShowBlink(false)
  
    const data = await spin(sessionId)
    const finalWinner = data.winner
    const winnerIndex = options.indexOf(finalWinner)
  
    const totalRounds = 4
    const baseDelay = 120
    const maxExtraDelay = 1800
    const totalSteps = totalRounds * options.length + winnerIndex
  
    let currentStep = 0
  
    const spinAnimation = () => {
      const index = currentStep % options.length
      setHighlightedIndex(index)
  
      if (currentStep < totalSteps) {
        const progress = currentStep / totalSteps
        const delay = baseDelay + Math.pow(progress, 4.5) * maxExtraDelay
        currentStep++
        setTimeout(spinAnimation, delay)
      } else {
        setWinner(finalWinner)
        setHighlightedIndex(null)
        setTimeout(() => setShowBlink(true), 300)
        setSpinning(false)
      }
    }
  
    spinAnimation()
  }
  

  const handleAdd = async () => {
    if (option.trim() === '' || !sessionId) return

    const data = await addOption(sessionId, option.trim())
    setOptions(data.options)
    setOption('')
  }

  const handleDelete = async (indexToRemove) => {
    const name = options[indexToRemove]
    if (!sessionId || !name) return

    const data = await deleteOption(sessionId, name)
    setOptions(data.options)
  }

  const handleReset = () => {
    window.location.reload()
  }

  useEffect(() => {
    const start = async () => {
      try {
        const session = await createSession()
        setSessionId(session.session_id)

        const optionsData = await getOptions(session.session_id)
        setOptions(optionsData.options)
      } catch (err) {
        console.error('Error creating session:', err)
      }
    }

    start()
  }, [])

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md sm:max-w-sm bg-gray-100 rounded-xl shadow p-6 space-y-4">
        <Header />
        <OptionInput option={option} setOption={setOption} handleAdd={handleAdd} spinning={spinning} />
        <OptionList
          options={options}
          highlightedIndex={highlightedIndex}
          winner={winner}
          showBlink={showBlink}
          handleDelete={handleDelete}
          spinning={spinning}
        />
        {options.length > 1 && (
          <Controls handleSpin={handleSpin} handleReset={handleReset} spinning={spinning} />
        )}
        {winner && (
          <div className="mt-4 text-center text-xl font-bold text-purple-700 animate-fade-in">
            🍽 Let's eat at <span className="underline">{winner}</span>!
          </div>
        )}
      </div>
    </div>
  )
}

export default App
