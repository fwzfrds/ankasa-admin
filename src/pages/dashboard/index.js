import React from 'react'
import { Container } from 'react-bootstrap'
import Navs from '../../components/module/navbar'
import styles from './Dashboard.module.css'
import Accordion from 'react-bootstrap/Accordion';
import { Routes, Route, Link } from 'react-router-dom';
import TicketList from '../../components/module/ticketList/index';
import AirlinesList from '../../components/module/airlinesList';
import AddTicket from '../../components/module/addTicket';
import AddAirline from '../../components/module/addAirline';

function Dashboard() {
    return (
        <Container fluid className={`${styles.container}`}>
            <Navs />
            <div className={`${styles.dashboard}`}>
                <div className={`${styles.sidenav}`}>
                    <Accordion className={`${styles.accordions}`}>
                        <Accordion.Item eventKey="0" className={`${styles.accordion_item}`}>
                            <Accordion.Header className={`${styles.accordion_header}`}>Airlines</Accordion.Header>
                            <Accordion.Body className={`${styles.accordion_body}`}>
                                <Link to={'/airlines-list'}>list</Link>
                                <Link to={'/add-airline'}>+ add airline</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1" className={`${styles.accordion_item}`}>
                            <Accordion.Header className={`${styles.accordion_header}`}>Ticket</Accordion.Header>
                            <Accordion.Body className={`${styles.accordion_body}`}>
                                <Link to={'/ticket-list'}>list</Link>
                                <Link to={'/add-ticket'}>+ add ticket</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2" className={`${styles.accordion_item}`}>
                            <Accordion.Header className={`${styles.accordion_header}`}>User</Accordion.Header>
                            <Accordion.Body className={`${styles.accordion_body}`}>
                                <Link to={'/ticket-list'}>list</Link>
                                <Link to={'/add-ticket'}>+ add ticket</Link>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className={`${styles.data}`}>
                    <Routes>
                        <Route path="ticket-list" element={<TicketList />} />
                        <Route path="add-ticket" element={<AddTicket />} />
                        <Route path="airlines-list" element={<AirlinesList />} />
                        <Route path="add-airline" element={<AddAirline />} />
                    </Routes>
                </div>
            </div>
        </Container>
    )
}

export default Dashboard