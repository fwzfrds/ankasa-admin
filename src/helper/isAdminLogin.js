import React from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert'

const IsAdminLogin = ({ children }) => {
  const isAuth = localStorage.getItem('AnkasaAdmin')
  if (isAuth) {
    swal({
      title: "Warning!",
      text: `Your Account is LoggedIn!`,
      icon: "warning",
    });

    return (
        <Navigate to={'/'} replace/>
    )
  }
  return children
}

export default IsAdminLogin