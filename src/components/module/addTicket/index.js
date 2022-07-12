import React, { useState } from 'react'
import styles from './AddTicket.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import swal from 'sweetalert'

const AddTicket = () => {

    const [ticketData, setTicketData] = useState('')

    const handleInput = (e) => {
        e.persist()

        if (e.target.name === 'price' || e.target.name === 'stock') {
            const value = parseInt(e.target.value)
            setTicketData({ ...ticketData, [e.target.name]: value })
        } else {
            setTicketData({ ...ticketData, [e.target.name]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        swal({
            title: "Add Ticket",
            text: `Add New Ticket Success`,
            icon: "success",
        })
    }

    console.log(ticketData)

    return (
        <div className={`${styles.add_ticket}`}>
            <h3>Add Ticket</h3>
            <Form className={`${styles.add_forms}`} id='ticket-form'
                onSubmit={handleSubmit}
            >
                <Form.Group className="mb-3" controlId="origin">
                    <Form.Label>Origin</Form.Label>
                    <Form.Control type="text" name='origin' placeholder="ex: Jakarta" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="destination">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control type="text" name='destination' placeholder="ex: Bali" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departure">
                    <Form.Label>Departure</Form.Label>
                    <Form.Control type="time" name='departure' placeholder="Departure" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="arrive">
                    <Form.Label>Arrived</Form.Label>
                    <Form.Control type="time" name='arrive' placeholder="Arrived" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="transit">
                    <Form.Label>Transit</Form.Label>
                    <Form.Control type="text" name='transit' placeholder="ex: direct" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name='price' placeholder="ex: 15000" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="facilities">
                    <Form.Label>Facilities</Form.Label>
                    <Form.Control type="text" name='facilities' placeholder="ex: wi-fi" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" name='stock' placeholder="ex: 20" onChange={handleInput} />
                </Form.Group>

            </Form>
            <Button variant="primary" type="submit" form='ticket-form'>
                Submit
            </Button>
        </div>
    )
}

export default AddTicket