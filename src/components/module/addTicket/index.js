import React, { useEffect, useState, useCallback } from 'react'
import styles from './AddTicket.module.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
// import swal from 'sweetalert'
import CountryData from '../../../helper/CountryCodes.json'
import CountryStateCity from '../../../helper/countryStatetCity.json'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAirlines } from '../../../config/redux/actions/airlineAction'
import { addTicket } from '../../../config/redux/actions/ticketAction'
import { useNavigate } from 'react-router-dom'


const AddTicket = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { activeAirlines: airlines } = useSelector((state) => state.activeAirlines)
    const [ticketData, setTicketData] = useState('')
    const [originCities, setOriginCities] = useState('')
    const [destinationCities, setDestinationCities] = useState('')
    const [airports, setAirports] = useState('')

    const fetchAirlines = useCallback(async () => {
        dispatch(getActiveAirlines())
    }, [dispatch])

    useEffect(() => {
        fetchAirlines()
    }, [fetchAirlines])

    const handleInput = (e) => {
        // e.persist()

        if (e.target.name === 'price' || e.target.name === 'stock') {
            const value = parseInt(e.target.value)
            setTicketData({ ...ticketData, [e.target.name]: value })
        } else if (e.target.name === 'airline') {
            const value = (e.target.value).split('_')
            setTicketData({ ...ticketData, airline: value[0], airline_id: value[1] })
        } else {
            setTicketData({ ...ticketData, [e.target.name]: e.target.value })
        }
    }

    const handleOriginCountry = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value })
        const value = (e.target.value).split('-')
        let cityList = CountryStateCity.filter(city => city.country === value[0]).map(city => city.name).sort()
        setOriginCities(cityList)
    }

    const handleDestinationCountry = (e) => {
        setTicketData({ ...ticketData, [e.target.name]: e.target.value })
        const value = (e.target.value).split('-')
        let cityList = CountryStateCity.filter(city => city.country === value[0]).map(city => city.name).sort()
        setDestinationCities(cityList)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(ticketData)
        dispatch(addTicket(ticketData)).then(() => {
            navigate('/ticket-list')
        })

    }

    const fetchAirport = async (city) => {
        console.log(city)
        try {
            const result = await axios.get(`https://aerodatabox.p.rapidapi.com/airports/search/term`, {
                params: { q: city, limit: '10' },
                headers: {
                    'X-RapidAPI-Key': 'cf4d244977mshd6f0de9223dac8ap1a888bjsn342d66fd8472',
                    'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
                }
            })

            console.log(result.data)
            const airportList = result.data.items
            setAirports(airportList)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (ticketData.origin) {
            fetchAirport(ticketData.origin)
        }
    }, [ticketData.origin])

    return (
        <div className={`${styles.add_ticket}`}>
            <h3>Add Ticket</h3>
            <Form className={`${styles.add_forms}`} id='ticket-form'
                onSubmit={handleSubmit}
            >
                <div className={`${styles.select_airline}`}>
                    <label htmlFor="">Airline</label>
                    <select name="airline" id="airline" defaultValue={`Select Airline`}
                        onChange={handleInput}
                    >
                        <option>Select Airline</option>
                        {airlines.map((airline, idx) => {
                            return (
                                <option key={idx} value={`${airline.airlinename}_${airline.airlineid}`}>{airline.airlinename}</option>
                            )
                        })}
                        {/* <option value="air asia">Air Asia</option> */}
                    </select>
                </div>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="">Class</label>
                    <select name="class" id="class" defaultValue={`Select Class`}
                        onChange={handleInput}
                    >
                        <option>Select Class</option>
                        <option value="1">Economy</option>
                        <option value="2">Business</option>
                        <option value="3">First Class</option>
                    </select>
                </div>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="country_origin">Origin Country</label>
                    <select name="country_origin" id="country_origin"
                        onChange={handleOriginCountry} defaultValue={`Select Country`}
                    >
                        <option>Select Country</option>
                        {CountryData.map((country, idx) => {
                            return (
                                <option key={idx} value={`${country.name}-(${country.code})`}>{country.name} ({country.code})</option>
                            )
                        })
                        }
                    </select>
                </div>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="origin">Origin City</label>
                    <select name="origin" id="origin"
                        onChange={handleInput} defaultValue={`Select City`}
                    >
                        <option>Select City</option>
                        {originCities && originCities.map((city, idx) => {
                            return (
                                <option key={idx} value={city}>{city}</option>
                            )
                        })
                        }
                    </select>
                </div>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="airport">Origin Airport</label>
                    <select name="airport" id="airport"
                        onChange={handleInput} defaultValue={`Select Airport`}
                    >
                        <option>Select Airport</option>
                        {airports && airports.map((airport, idx) => {
                            return (
                                <option key={idx} value={airport.shortName}>{airport.shortName}</option>
                            )
                        })
                        }
                    </select>
                </div>

                <Form.Group className="mb-3" controlId="gate">
                    <Form.Label>Gate</Form.Label>
                    <Form.Control type="text" name='gate' placeholder="ex: A or B" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="terminal">
                    <Form.Label>Terminal</Form.Label>
                    <Form.Control type="text" name='terminal' placeholder="ex: 12 or 221" onChange={handleInput} />
                </Form.Group>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="country_destination">Destination Country</label>
                    <select name="country_destination" id="country_destination"
                        onChange={handleDestinationCountry} defaultValue={`Select Country`}
                    >
                        <option>Select Country</option>
                        {CountryData.map((country, idx) => {
                            return (
                                <option key={idx} value={`${country.name}-(${country.code})`}>{country.name} ({country.code})</option>
                            )
                        })
                        }
                    </select>
                </div>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="destination">Destination City</label>
                    <select name="destination" id="destination"
                        onChange={handleInput} defaultValue={`Select City`}
                    >
                        <option>Select Country</option>
                        {destinationCities && destinationCities.map((city, idx) => {
                            return (
                                <option key={idx} value={city}>{city}</option>
                            )
                        })
                        }
                    </select>
                </div>

                <Form.Group className="mb-3" controlId="departure_date">
                    <Form.Label>Departure Date</Form.Label>
                    <Form.Control type="date" name='departure_date' placeholder="Departure Date" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="departure">
                    <Form.Label>Departure</Form.Label>
                    <Form.Control type="time" name='departure' placeholder="Departure" onChange={handleInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="arrive">
                    <Form.Label>Arrived</Form.Label>
                    <Form.Control type="time" name='arrive' placeholder="Arrived" onChange={handleInput} />
                </Form.Group>

                <div className={`${styles.select_airline}`}>
                    <label htmlFor="transit">Transit</label>
                    <select name="transit" id="transit"
                        onChange={handleInput} defaultValue={`Select Transit`}
                    >
                        <option>Select Transit</option>
                        {['direct', 'transit', 'transit 2+'].map((transit, idx) => {
                            return (
                                <option key={idx} value={transit}>{transit}</option>
                            )
                        })
                        }
                    </select>
                </div>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price ($)</Form.Label>
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