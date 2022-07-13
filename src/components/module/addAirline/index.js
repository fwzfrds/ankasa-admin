import React, { useState } from 'react'
import styles from './AddAirline.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert'
import { useDispatch, useSelector } from 'react-redux'
import { addAirline } from '../../../config/redux/actions/airlineAction'

const AddAirline = () => {


    const dispatch = useDispatch()
    const { airlines } = useSelector((state) => state.airlines)
    const [airlineData, setAirlineData] = useState('')
    const [previewLogo, setPreviewLogo] = useState('https://fakeimg.pl/350x200/?text=Hello')

    const handleInput = (e) => {
        e.persist()
        setAirlineData({ ...airlineData, [e.target.name]: e.target.value })
    }

    const handleLogoInput = (e) => {
        const file = e.target.files[0]
        const urlPreview = URL.createObjectURL(file)
        setPreviewLogo(urlPreview)
        setAirlineData({ ...airlineData, logo: file })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formData = new FormData()
        if (airlineData.logo) {
            formData.append('logo', airlineData.logo)
        }
        if (airlineData.airlineName) {
            formData.append('airlineName', airlineData.airlineName)
        }
        if (airlineData.pic) {
            formData.append('pic', airlineData.pic)
        }
        if (airlineData.phoneNumber) {
            formData.append('phoneNumber', airlineData.phoneNumber)
        }

        console.log(formData.get('logo'))
        console.log(formData.get('airlineName'))
        console.log(formData.get('pic'))
        console.log(formData.get('phoneNumber'))

        if (airlineData.length < 1) {
            console.log(airlineData.length)
            return swal({
                title: "Error",
                text: 'Please complete the data',
                icon: "warning",
            })
        } else if (airlineData.airlineName === '' && airlineData.pic === '' && airlineData.phoneNumber === '') {
            return swal({
                title: "Error",
                text: 'Please complete the data',
                icon: "warning",
            })
        }
        dispatch(addAirline(formData))

        swal({
            title: "Succes",
            text: 'Add New Airline Success',
            icon: "success",
        })

    }

    console.log(previewLogo)
    console.log(airlineData)
    console.log(airlines)

    return (
        <div className={`${styles.add_airline}`}>
            <h3>Add Airline</h3>
            <div className={`${styles.forms}`}>

                <div className={`${styles.preview_logo}`}>
                    <img src={previewLogo} alt="" />
                </div>

                <Form className={`${styles.add_forms}`} id='ticket-form'
                    onSubmit={handleSubmit}
                >
                    <Form.Group className="mb-3" controlId="origin">
                        <Form.Label>Ariline Name</Form.Label>
                        <Form.Control type="text" name='airlineName' placeholder="ex: Garuda Indonesia" onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="destination">
                        <Form.Label>PIC</Form.Label>
                        <Form.Control type="text" name='pic' placeholder="ex: Muhammad Fawwaz" onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="departure">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" name='phoneNumber' placeholder="ex: 0873547xxxx" onChange={handleInput} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="arrive">
                        <Form.Label>Logo</Form.Label>
                        <Form.Control type="file" name='logo' placeholder="Select Logo" onChange={handleLogoInput} />
                    </Form.Group>

                </Form>
            </div>
            <Button variant="primary" type="submit" form='ticket-form'>
                Submit
            </Button>
        </div>
    )
}

export default AddAirline