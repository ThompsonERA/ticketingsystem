import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createTicket, fetchAllTickets, updateTicket } from './services/ticketServices'
import TicketForm from './Components/TicketForm/TicketForm'
import { formatDate } from './util/dateUtil'


function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const getAllTickets = async () => {
    setTickets(await fetchAllTickets());
  }

  const sendSaveRequest = async (id, summary, priority, status, create_date, update_date) => {
    const newTicket = { id, summary, priority, status, create_date: formatDate(new Date(create_date)), update_date: formatDate(new Date(update_date))};

    const savedTicket = id ? await updateTicket(id, newTicket) : await createTicket(newTicket);

    if(!savedTicketTicket){
      return;
    }
    getAllTickets();
    setCurrentTicket(savedTicket)
  }
 
  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <>
      <TicketForm
        id={currentTicket.id}
        summary={currentTicket.summary}
        priority={currentTicket.priority}
        status={currentTicket.status}
        createDate={currentTicket.createDate ? new Date(currentTicket.createDate) : new Date()}
        updateDate={currentTicket.updateDate ? new Date(currentTicket.updateDate) : new Date()}
        readonly={false}
        onSubmit={sendSaveRequest}
      />

      <ul>Tickets
        {tickets.map((ticket, index) => (
          <li key={index} onClick={setCurrentTicket(ticket)}>
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
