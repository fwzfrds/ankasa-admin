import React, { useEffect, useState } from 'react'
// import Table from 'react-bootstrap/Table';
import styles from './AirlineList.module.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const AirlinesList = () => {

    const [airlines, setAirlines] = useState('')

    useEffect(() => {
        const fetchAirlines = async () => {
            const result = await axios.get(`https://ankasa-backend-api.herokuapp.com/airlines`)
            setAirlines(result.data.data)
        }

        fetchAirlines()
    }, [])

    console.log(airlines)

    return (
        <div className={`${styles.airline_list}`}>
            <h3>Airline List</h3>
            <div className={`${styles.airline_table}`}>
                {airlines ? airlines.map((airline, idx) => {
                    return (
                        <Card style={{ width: '18rem' }} key={idx}>
                            <div className={`${styles.logo_container}`}>
                                <Card.Img variant="top" src={airline.logo} />
                            </div>
                            <Card.Body>
                                <Card.Title>{airline.airlinename}</Card.Title>
                                <Card.Text>
                                    <ul>
                                        <li>PIC : {airline.pic}</li>
                                        <li>Phone: {airline.phonenumber}</li>
                                    </ul>
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>

                    )
                })
                    :
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }

            </div>
        </div>
    )
}

export default AirlinesList