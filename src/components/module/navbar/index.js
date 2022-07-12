import React from 'react'
import styles from './Navbar.module.css'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LogoWithRouter } from '../../base/logo/index'

function Navs() {
    return (
        <Navbar bg="primary" variant="dark" className={`${styles.navbar}`}>
            <Container>
                <Navbar.Brand href="#home">
                    <LogoWithRouter />
                </Navbar.Brand>
                <Nav className="">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#logout">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navs