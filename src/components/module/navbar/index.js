import React from 'react'
import styles from './Navbar.module.css'
import { Container } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { LogoWithRouter } from '../../base/logo/index'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Navs() {

    const navigate = useNavigate()

    const handleLogout = () => {
        swal({
            title: "Logout",
            text: `Are you sure want to logout?`,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(async (isOkay) => {
            if (isOkay) {

                if (localStorage.getItem('AnkasaAdmin')) {
                    localStorage.removeItem('AnkasaAdmin')
                    await swal({
                        title: "Succes",
                        text: `Logout Success `,
                        icon: "success",
                    })
                    navigate('/auth/sign-in')
                }
            }
        })
    }

    return (
        <Navbar bg="primary" variant="dark" className={`${styles.navbar}`}>
            <Container>
                <Navbar.Brand href="#home">
                    <LogoWithRouter />
                </Navbar.Brand>
                <Nav className="">
                    {/* <Nav.Link href="#home">Home</Nav.Link> */}

                    <Nav.Link href="#logout" className={`${styles.logout_btn}`}>
                        Logout
                        <i className={`fa-solid fa-arrow-right-from-bracket`}
                            onClick={handleLogout}
                        ></i>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navs