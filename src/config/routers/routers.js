import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddAirline from '../../components/module/addAirline'
import AddTicket from '../../components/module/addTicket'
import AirlinesList from '../../components/module/airlinesList'
import TicketList from '../../components/module/ticketList'
import IsAdmin from '../../helper/isAdmin'
import IsAdminLogin from '../../helper/isAdminLogin'
import SignIn from '../../pages/auth/signin'
import SignUp from '../../pages/auth/signup'
import Dashboard from '../../pages/dashboard'
import Page404 from '../../pages/notFound/Page404'

const Routers = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IsAdmin> <Dashboard /> </IsAdmin>}>
          <Route path="/ticket-list" element={<TicketList />} />
          <Route path="/add-ticket" element={<AddTicket />} />
          <Route path="/airlines-list" element={<AirlinesList />} />
          <Route path="/add-airline" element={<AddAirline />} />
        </Route>
        <Route path="/auth/sign-up" element={<IsAdminLogin> <SignUp /> </IsAdminLogin>} />
        <Route path="/auth/sign-in" element={<IsAdminLogin> <SignIn /> </IsAdminLogin>} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers