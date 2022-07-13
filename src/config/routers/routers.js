import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddAirline from '../../components/module/addAirline'
import AddTicket from '../../components/module/addTicket'
import AirlinesList from '../../components/module/airlinesList'
import TicketList from '../../components/module/ticketList'
import Dashboard from '../../pages/dashboard'
import Page404 from '../../pages/notFound/Page404'

const Routers = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/ticket-list" element={<TicketList />} />
          <Route path="/add-ticket" element={<AddTicket />} />
          <Route path="/airlines-list" element={<AirlinesList />} />
          <Route path="/add-airline" element={<AddAirline />} />
        </Route>
        {/* <Route path="/productlist" element={<ProductList/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/product/:id" element={<DetailProduct/>}/>
        <Route path="/register" element={<Register/>}/> */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers