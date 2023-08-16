import React, { useEffect, useState } from 'react';
import axios from "axios"


const TicketService = () => {
  const [list,setList] = useState([]);

  useEffect(() => {
    const fetchData = async () =>{
      const tickets = await fetch("http://localhost:3001/all");
      const json = await tickets.json();
      setList(json)
    };
    fetchData();
  },[]);

  
  return (
    <ul> Tickets
      {list.map((ticket,index) => (
        <>
        <li key={index} style={{border:"1px solid black"}}>
          <p>{ticket.id}</p>
          <p>{ticket.summary}</p>
          <p>{ticket.status}</p>
          <p>{ticket.create_date}</p>
          <p>{ticket.update_date}</p>
        </li>
        </>
      ))}
    </ul>
  )
}

export default TicketService