export const fetchAllTickets = async () => {
    const response = await fetch("http://localhost:3001/all");
    return await response.json();
};


export const fetchTicket = async (id) => {
    const response = await fetch(`http://localhost:3001/ticket/${id}`);
    return await response.json();
};


export const createTicket = async (ticket) => {
    const response = await fetch("http://localhost:3001/ticket", {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify(ticket),
    });

    if(response.status !== 200){
        console.error("Could not create ticket ");
        return null;
    }

    return await response.json()
};


export const updateTicket = async (id,ticket) => {
    if(ticket.id){
        delete ticket.id;
    }
    const response = await fetch(`http://localhost:3001/ticket/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify(ticket),
    });
    if(response.status !== 200){
        console.error("Could not update ticket ");
        return null;
    }

    return await response.json()
};


export const deleteTicket = async (id) => {
    const response = await fetch(`http://localhost:3001/ticket/${id},`,{
        method: "DELETE"
    });
}
