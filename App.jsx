import { useState } from 'react'
import './App.css'
import CurrencyConverter from './components/currency-converter.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-gray-100 flex items-center'>
      <div className='container'>
       <CurrencyConverter />
      </div>
    </div>
  )
}

export default App
