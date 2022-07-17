import React from 'react'
import { Navigate } from 'react-router-dom'
import swal from 'sweetalert'

const IsAdmin = ({children}) => {
  const isAuth = localStorage.getItem('AnkasaAdmin')
  if (!isAuth){
    swal({
        title: "Good job!",
        text: `Access Denied, Please Login!`,
        icon: "error",
    });  
    return (
      <Navigate to="/auth/sign-in" replace />
    )
  }
  return children
}

export default IsAdmin