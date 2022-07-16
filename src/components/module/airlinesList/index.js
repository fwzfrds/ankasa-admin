import React, { useEffect, useState, useCallback } from 'react'
// import Table from 'react-bootstrap/Table';
import swal from 'sweetalert';
import styles from './AirlineList.module.css'
// import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { getAirlines, updateAirline, deleteAirline } from '../../../config/redux/actions/airlineAction'

const AirlinesList = () => {

    const dispatch = useDispatch()
    const { airlines: airlinesData } = useSelector((state) => state.airlines)

    const [airlineUpdate, setAirlineUpdate] = useState('')
    const [previewLogo, setPreviewLogo] = useState('')

    const [show1, setShow1] = useState(false)

    const handleClose1 = () => {
        setShow1(false)
    }
    const handleShow1 = (airlineId) => {
        setShow1(true)
        setSelectedAirlineId(airlineId)
    }

    const [show2, setShow2] = useState(false)

    const handleClose2 = () => {
        setShow2(false)
        if (previewLogo) {
            setPreviewLogo('')
        }
        setAirlineUpdate('')
    }
    const handleShow2 = (airlineId) => {
        setShow2(true)
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

    const handleInput = (e) => {
        e.persist()
        if (e.target.name === ' status') {
            const value = parseInt(e.target.value)
            setAirlineUpdate({ ...airlineUpdate, [e.target.name]: value })
        } else {
            setAirlineUpdate({ ...airlineUpdate, [e.target.name]: e.target.value })
        }
    }

    const handleLogoInput = (e) => {
        const file = e.target.files[0]
        const urlPreview = URL.createObjectURL(file)
        setPreviewLogo(urlPreview)
        setAirlineUpdate({ ...airlineUpdate, logo: file })
    }

    const handleDelPrevLogo = (e) => {
        e.preventDefault()

        setPreviewLogo('')
        delete airlineUpdate.logo
    }

    const handleSubmit = (e, id) => {
        e.preventDefault()

        let formData = new FormData()
        if (airlineUpdate.logo) {
            formData.append('logo', airlineUpdate.logo)
        }
        if (airlineUpdate.airlineName) {
            formData.append('airlineName', airlineUpdate.airlineName)
        }
        if (airlineUpdate.pic) {
            formData.append('pic', airlineUpdate.pic)
        }
        if (airlineUpdate.phoneNumber) {
            formData.append('phoneNumber', airlineUpdate.phoneNumber)
        }
        if (airlineUpdate.status) {
            formData.append('status', airlineUpdate.status)
        }

        console.log(formData.get('logo'))
        console.log(formData.get('airlineName'))
        console.log(formData.get('pic'))
        console.log(formData.get('phoneNumber'))
        console.log(formData.get('status'))

        console.log(id)

        if (airlineUpdate.length < 1) {
            return swal({
                title: "Error",
                text: 'Please complete the data',
                icon: "warning",
            })
        } else if (airlineUpdate.airlineName === '' && airlineUpdate.pic === '' && airlineUpdate.phoneNumber === '' && airlineUpdate.status === '') {
            return swal({
                title: "Error",
                text: 'Please complete the data',
                icon: "warning",
            })
        } else if (Object.keys(airlineUpdate).length === 0) {
            return swal({
                title: "Error",
                text: 'Please complete the data',
                icon: "warning",
            })
        }

        dispatch(updateAirline(formData, id))

        swal({
            title: "Succes",
            text: 'update Airline Data Success',
            icon: "success",
        })
    }

    const handleDelAirline = (e, airlineName, idx, id) => {
        e.preventDefault()

        let thisClicked = e.currentTarget
        console.log(idx)

        swal({
            title: "Are you sure?",
            text: `${airlineName} data cannot be restored`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (isOkay) => {
            if (isOkay) {
                dispatch(deleteAirline(id))
                await swal({
                    title: "Succes",
                    text: `Delete ${airlineName} Success `,
                    icon: "success",
                })
                // thisClicked.closest('div').remove();
                console.log(thisClicked)
            } else {
                swal({
                    title: "Delete",
                    text: `Delete message canceled`,
                    icon: "error",
                })
            }
        })
    }

    // console.log(airlineUpdate)

    return (
        <div className={`${styles.airline_list}`}>
            <h3>Airline List</h3>
            <div className={`${styles.airline_table}`}>
                {airlinesData ? airlinesData.map((airline, idx) => {
                    return (
                        <Card style={{ width: '18rem' }} key={idx}>
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
                                    <Button variant="primary" onClick={() => handleShow1(airline.airlineid)}>
                                        <i className="fa-solid fa-eye"></i>
                                    </Button>
                                    <Button variant="success" onClick={() => handleShow2(airline.airlineid)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                    <Button variant="danger"
                                        onClick={(e) => handleDelAirline(e, airline.airlinename, idx, airline.airlineid)}
                                    >
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
                <>
                    <Modal show={show1} onHide={handleClose1} key={selectedAirline.airlineid}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedAirline.airlinename}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={`${styles.modal_img}`}>
                                <img src={selectedAirline.logo} alt="" />
                            </div>
                            <p>PIC Name: {selectedAirline.pic}</p>
                            <p>Phone Number: {selectedAirline.phonenumber}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose1}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose1}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedAirline.airlinename}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className={`${styles.modal_img}`}>
                                <img src={previewLogo ? previewLogo : selectedAirline.logo} alt="" />
                            </div>
                            {previewLogo &&
                                <p
                                    onClick={handleDelPrevLogo}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Delete Logo
                                </p>
                            }
                            <Form className={`${styles.add_forms}`} id='airline-form'
                                onSubmit={(e) => handleSubmit(e, selectedAirline.airlineid)}
                            >
                                <Form.Group className="mb-3" controlId="origin">
                                    <Form.Label>Ariline Name</Form.Label>
                                    <Form.Control type="text" name='airlineName' placeholder={selectedAirline.airlinename} onChange={handleInput} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="destination">
                                    <Form.Label>PIC</Form.Label>
                                    <Form.Control type="text" name='pic' placeholder={selectedAirline.pic} onChange={handleInput} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="departure">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="text" name='phoneNumber' placeholder={selectedAirline.phonenumber} onChange={handleInput} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="departure">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control type="number" name='status' placeholder={selectedAirline.status} onChange={handleInput} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="arrive">
                                    <Form.Label>Logo</Form.Label>
                                    <Form.Control type="file" name='logo' placeholder="Select Logo" onChange={handleLogoInput} />
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose2}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit' form='airline-form'>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </>
            }

        </div>
    )
}

export default AirlinesList