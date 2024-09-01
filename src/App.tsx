import React, { useEffect, useState } from 'react'
// mui components

import { Route, Routes } from 'react-router-dom';
import DashBoard from './pages/DashBoard';
import SignUp from './pages/Singup';
import SignIn from './pages/SingIn';
import ProtectedRoute from './components/ProtectedRoute';
// import Pagination from './components/Pagination';

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <DashBoard />
        </ProtectedRoute>
      } />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path='*' element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App