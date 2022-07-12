import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import styles from './TicketList.module.css'
import Spinner from 'react-bootstrap/Spinner';

const TicketList = () => {

  const [tickets, setTickets] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const result = await axios.get(`https://ankasa-backend-api.herokuapp.com/ticket`)
      // console.log(result.data)
      setTickets(result.data.data)
    }
    fetch()
  }, [])

  console.log(tickets)

  return (
    <div className={`${styles.ticket_list}`}>
      <h3>Ticket List</h3>
      <div className={`${styles.ticket_table}`}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>airline_id</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Transit</th>
              <th>Departure</th>
              <th>Arrived</th>
              <th>Facilities</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {tickets ? tickets.map((ticket, idx) => {
              return (
                <tr key={idx}>
                  <td>{ticket.id}</td>
                  <td>{ticket.airline_id}</td>
                  <td>{ticket.origin}</td>
                  <td>{ticket.destination}</td>
                  <td>{ticket.transit}</td>
                  <td>{ticket.departure}</td>
                  <td>{ticket.arrive}</td>
                  <td>{ticket.facilities}</td>
                  <td>{ticket.price}</td>
                  <td>{ticket.stock}</td>
                </tr>
              )
            })
              :
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            }

          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default TicketList