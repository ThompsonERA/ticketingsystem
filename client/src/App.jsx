import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { fetchAllTickets } from './services/ticketServices'


function App() {
  const [tickets, setTickets] = useState([])
  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  }

  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>
            <p>{ticket.id}</p>
            <p>{ticket.summary}</p>
            <p>{ticket.status}</p>
            <p>{ticket.create_date}</p>
            <p>{ticket.update_date}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
