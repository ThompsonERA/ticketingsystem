import React, { useState } from 'react'

const TicketForm = ({
    id = '',
    summary,
    priority,
    status,
    createDate = new Date(),
    updateDate = new Date(),
    readonly = false,
    onSubmit = () => { },
    }) => {
        const[tSummary,setTSummary] = useState(summary);
        const[tPriority,setTPriotity] = useState(priority);
        const[tStatus, setTStatus] = useState(status);
    
    return (
        <div className='ticket-form'>
            <div className='form'>
                <label htmlFor='id'>ID</label>
                <input type='number' name='id' value={id} disabled/>

                <label htmlFor='summary'>SUMMARY</label>
                <input type='text' name='summary' value={tSummary} disabled={readonly} onChange={(e)=> setTSummary(e.target.value)}/>

                <label htmlFor='priority'>PRIORITY</label>
                <select  name='priority' value={tPriority} disabled={readonly} onChange={(e)=> setTPriotity(e.target.value)}>
                    <option>LOW</option>
                    <option>MEDIUM</option>
                    <option>HIGH</option>
                </select>

                <label htmlFor='status'>STATUS</label>
                <select  name='status' value={tStatus} disabled={readonly} onChange={(e)=> setTStatus(e.target.value)}>
                    <option>CREATED</option>
                    <option>REJECTED</option>
                    <option>IN PROGRESS</option>
                    <option>COMPLETED</option>
                </select>

                <label htmlFor='createDate'>CREATE DATE</label>
                <input type='date' name='createDate' value={createDate} disabled/>

                <label htmlFor='updateeDate'>UPDATE DATE</label>
                <input type='date' name='updateDate' value={updateDate} disabled/>
            </div>
        </div>
    )
}

export default TicketForm