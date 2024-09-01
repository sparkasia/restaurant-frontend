import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("rest_token");

  return (
    <>
      {!token && <Navigate to="/signin" />}
      {token && children}
    </>
  )
}

export default ProtectedRoute