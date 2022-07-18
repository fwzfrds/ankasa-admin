import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import styles from './TicketList.module.css'
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import swal from 'sweetalert';
import CountryData from '../../../helper/CountryCodes.json'
import CountryStateCity from '../../../helper/countryStatetCity.json'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTicket, updateTicket } from '../../../config/redux/actions/ticketAction'

const TicketList = () => {

  const dispatch = useDispatch()
  const { activeAirlines: airlines } = useSelector((state) => state.activeAirlines)

  // Bootstrap Modal
  const [show1, setShow1] = useState(false)
  const handleClose1 = () => setShow1(false)
  const handleShow1 = (ticketId) => {
    setShow1(true)
    setSelectedTicketId(ticketId)
  }

  const [show2, setShow2] = useState(false)
  const handleClose2 = () => {
    setShow2(false)
    setTicketData('')
  }
  const handleShow2 = (ticketId) => {
    setShow2(true)
    setSelectedTicketId(ticketId)
  }
  // Bootstrap Modal Eend

  const [tickets, setTickets] = useState('')
  const [selectedTicketId, setSelectedTicketId] = useState('')
  const [selectedTicket, setSelectedTicket] = useState('')
  const [ticketData, setTicketData] = useState('')
  const [originCities, setOriginCities] = useState('')
  const [destinationCities, setDestinationCities] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  const fetch = async () => {
    const result = await axios.get(`https://ankasa-backend-api.herokuapp.com/ticket?limit=6`)
    setTickets(result.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    if (selectedTicketId) {
      setSelectedTicket((tickets.data).find(ticket => ticket.id === selectedTicketId))
    }
  }, [selectedTicketId, tickets])

  const handleDelTicket = (e, idx, id) => {
    e.preventDefault()

    let thisClicked = e.currentTarget
    console.log(idx)

    swal({
      title: "Are you sure?",
      text: `This ticket data cannot be restored`,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(async (isOkay) => {
      if (isOkay) {
        dispatch(deleteTicket(id))
        await swal({
          title: "Succes",
          text: `Delete Ticket Success `,
          icon: "success",
        })
        // thisClicked.closest('div').remove();
        console.log(thisClicked)
      } else {
        swal({
          title: "Delete",
          text: `Delete ticket canceled`,
          icon: "error",
        })
      }
    })
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

  const handleInput = (e) => {
    e.persist()

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

  const handleUpdate = async (e, selectedTicket) => {
    e.preventDefault()

    setIsUpdate(true)

    const id = selectedTicket.id
    ticketData.country_origin === 'Select Country' && delete ticketData.country_origin
    ticketData.origin === 'Select City' && delete ticketData.origin
    ticketData.country_destination === 'Select Country' && delete ticketData.country_destination
    ticketData.destination === 'Select City' && delete ticketData.destination

    console.log(ticketData)
    console.log(Object.keys(ticketData).length)

    if (Object.keys(ticketData).length === 0) {
      setIsUpdate(false)
      return swal({
        title: "Update",
        text: `Update canceled, because data update is empty`,
        icon: "warning",
      })
    }
    dispatch(updateTicket(ticketData, id))

    // sampai sini terakhir

    setIsUpdate(false)
    fetch()

    // setTimeout(() => {
    //   setIsUpdate(false)
    // }, 3000)
  }

  console.log(ticketData)

  return (
    <div className={`${styles.ticket_list}`}>
      <h3>Ticket List</h3>
      <div className={`${styles.ticket_table}`}>
        {tickets ? (tickets.data).map((ticket, idx) => {
          return (
            <div key={idx} className={`${styles.ticket_card}`}>
              <div className={`${styles.detail}`}>
                <div className={`${styles.img_container}`}>
                  <img src={ticket.airline_logo} alt="" />
                </div>
                <div className={`${styles.data}`}>
                  <p>Price : <span>{ticket.price > 10000 ? 'Rp.' : '$'} {parseInt(ticket.price).toLocaleString()}</span></p>
                  <p>Origin : <span>{ticket.origin}</span></p>
                  <p>Destination : <span>{ticket.destination}</span></p>
                  <p>Class : <span>{ticket.class}</span></p>
                </div>
              </div>
              <div className={`${styles.card_actions}`}>
                <button className={`${styles.detail_btn}`}
                  onClick={() => handleShow1(ticket.id)}
                >
                  <i className='fa-solid fa-eye'></i>
                  Detail
                </button>
                <button className={`${styles.edit_btn}`}
                  onClick={() => handleShow2(ticket.id)}
                >
                  <i className='fa-solid fa-pen-to-square'></i>
                  Edit
                </button>
                <button className={`${styles.delete_btn}`}
                  onClick={(e) => handleDelTicket(e, idx, ticket.id)}
                >
                  <i className='fa-solid fa-trash'></i>
                  Delete
                </button>
              </div>
            </div>
          )
        })
          :
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        }

        {selectedTicket &&
          <>
            <Modal show={show1} onHide={handleClose1}>
              <Modal.Header closeButton>
                <Modal.Title>Ticket Detail</Modal.Title>
              </Modal.Header>
              <Modal.Body className={`${styles.detail_body}`}>
                <div className={`${styles.detail_img}`}>
                  <img src={selectedTicket.airline_logo} alt="" />
                </div>
                <div className={`${styles.detail_data}`}>
                  <p>Airline : <span>{selectedTicket.airline}</span></p>
                  <p>Price : {selectedTicket.price > 10000 ? 'Rp.' : '$'} <span>{parseInt(selectedTicket.price).toLocaleString()}</span></p>
                  {selectedTicket.class === 1 && <p>Class : <span>Economy</span></p>}
                  {selectedTicket.class === 2 && <p>Class : <span>Business</span></p>}
                  {selectedTicket.class === 3 && <p>Class : <span>First Class</span></p>}
                  <p>Origin : <span>{selectedTicket.origin}</span></p>
                  <p>Country : <span>{selectedTicket.country_origin}</span></p>
                  <p>Destination : <span>{selectedTicket.destination}</span></p>
                  <p>Dest Country : <span>{selectedTicket.country_destination}</span></p>
                  <p>Departure : <span>{selectedTicket.departure}</span></p>
                  <p>Arrived : <span>{selectedTicket.arrive}</span></p>
                  <p>Transit : <span>{selectedTicket.transit}</span></p>
                  <p>Facilities : <span>{selectedTicket.facilities}</span></p>
                  <p>Stock : <span>{selectedTicket.stock}</span></p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2} className={`${styles.edit_modal}`}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Ticket</Modal.Title>
              </Modal.Header>
              <Modal.Body className={`${styles.edit_body}`}>
                <div className={`${styles.select_airline}`}>
                  <label htmlFor="">Airline</label>
                  <select name="airline" id="airline" defaultValue={`${selectedTicket.airline}`}
                    onChange={handleInput}
                  >
                    <option>{selectedTicket.airline}</option>
                    {airlines.filter(airline => airline.airlinename !== selectedTicket.airline).map((airline, idx) => {
                      return (
                        <option key={idx} value={`${airline.airlinename}_${airline.airlineid}`}>{airline.airlinename}</option>
                      )
                    })
                    }
                  </select>
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="">Class</label>
                  <select name="class" id="class"
                    defaultValue={selectedTicket.class === 1 ? 'Economy' : selectedTicket.class === 2 ? 'Business' : 'First Class'}
                    onChange={handleInput}
                  >
                    <option>{selectedTicket.class === 1 ? 'Economy' : selectedTicket.class === 2 ? 'Business' : 'First Class'}</option>
                    {[1, 2, 3].filter(item => item !== selectedTicket.class).map((item, idx) => {
                      return (
                        <option key={idx} value={item}>{item === 1 ? 'Economy' : item === 2 ? 'Business' : 'First Class'}</option>
                      )
                    })}
                  </select>
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="country_origin">Origin Country: <span>{selectedTicket.country_origin}</span></label>
                  <select name="country_origin" id="country_origin"
                    onChange={handleOriginCountry} defaultValue={'Select Country'}
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
                  <label htmlFor="origin">Origin: <span>{selectedTicket.origin}</span></label>
                  <select name="origin" id="origin"
                    onChange={handleInput}
                    defaultValue={`Select City`}
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
                  <label htmlFor="country_destination">Dest Country: <span>{selectedTicket.country_destination}</span></label>
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
                  <label htmlFor="destination">Destination: <span>{selectedTicket.destination}</span></label>
                  <select name="destination" id="destination"
                    onChange={handleInput}
                    defaultValue={`Select City`}
                  >
                    <option>Select City</option>
                    {destinationCities && destinationCities.map((city, idx) => {
                      return (
                        <option key={idx} value={city}>{city}</option>
                      )
                    })
                    }
                  </select>
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="departure">Departure: <span>{selectedTicket.departure}</span></label>
                  <input type='time' name="departure" id="departure"
                    onChange={handleInput}
                  />
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="arrive">Arrived: <span>{selectedTicket.arrive}</span></label>
                  <input type='time' name="arrive" id="arrive"
                    onChange={handleInput}
                  />
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="transit">Transit: <span>{selectedTicket.transit}</span></label>
                  <select name="transit" id="transit"
                    onChange={handleInput}
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

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="facilities">Facilities</label>
                  <input type='text' name="facilities" id="facilities" placeholder={selectedTicket.facilities}
                    onChange={handleInput}
                  />
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="price">Price</label>
                  <input type='number' name="price" id="price" placeholder={selectedTicket.price}
                    onChange={handleInput}
                  />
                </div>

                <div className={`${styles.select_airline}`}>
                  <label htmlFor="stock">Stock</label>
                  <input type='number' name="stock" id="stock" placeholder={selectedTicket.stock}
                    onChange={handleInput}
                  />
                </div>


              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}
                  disabled={
                    isUpdate ? true : false
                  }
                >
                  Close
                </Button>
                <Button variant="primary" onClick={(e) => handleUpdate(e, selectedTicket)}
                  disabled={
                    isUpdate ? true : false
                  }
                >
                  {/* Save Changes */}
                  {isUpdate ?
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className='me-2'
                      />
                      Loading...
                    </>
                    : 'Save Changes'}
                </Button>
              </Modal.Footer>
            </Modal>

          </>
        }



      </div>
    </div>
  )
}

export default TicketList