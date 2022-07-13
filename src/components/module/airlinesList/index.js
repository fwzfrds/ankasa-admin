import React, { useEffect, useState, useCallback } from 'react'
// import Table from 'react-bootstrap/Table';
import styles from './AirlineList.module.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import {useDispatch, useSelector} from 'react-redux'
import {getAirlines} from '../../../config/redux/actions/airlineAction'

const AirlinesList = () => {

    const dispatch = useDispatch()
    const {airlines: airlinesData} = useSelector((state)=>state.airlines)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = (airlineId) => {
        setShow(true)
        setSelectedAirlineId(airlineId)
    }

    const [selectedAirlineId, setSelectedAirlineId] = useState('')
    const [selectedAirline, setSelectedAirline] = useState('')

    const fetchAirlines = useCallback(async () => {
        dispatch(getAirlines())
    }, [dispatch])

    useEffect(() => {
        fetchAirlines()
    }, [fetchAirlines])

    useEffect(() => {
        if (selectedAirlineId) {
            setSelectedAirline(airlinesData.find(airline => airline.airlineid === selectedAirlineId))
        }
    }, [selectedAirlineId, airlinesData])

    return (
        <div className={`${styles.airline_list}`}>
            <h3>Airline List</h3>
            <div className={`${styles.airline_table}`}>
                {airlinesData ? airlinesData.map((airline, idx) => {
                    return (

                        <Card style={{ width: '18rem' }} key={airline.airlineid}>
                            <div className={`${styles.logo_container}`}>
                                <Card.Img variant="top" src={airline.logo} />
                            </div>
                            <Card.Body>
                                <Card.Title>{airline.airlinename}</Card.Title>
                                <Card.Text>
                                    PIC: {airline.pic}
                                </Card.Text>
                                <Card.Text>
                                    Phone: {airline.phonenumber}
                                </Card.Text>

                                <div className={`${styles.card_actions}`}>
                                    <Button variant="primary" onClick={() => handleShow(airline.airlineid)}>
                                        <i className="fa-solid fa-eye"></i>
                                    </Button>
                                    <Button variant="success">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                    <Button variant="danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </Button>
                                </div>
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
            {selectedAirline &&
                <Modal show={show} onHide={handleClose} key={selectedAirline.airlineid}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedAirline.airlinename}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{selectedAirline.airlinename}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            }

        </div>
    )
}

export default AirlinesList