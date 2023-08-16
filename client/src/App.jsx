import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TicketService from './Components/TicketService'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TicketService/>
    </>
  )
}

export default App
