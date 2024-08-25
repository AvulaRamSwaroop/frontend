import React from 'react'
import { LandingPage } from './vendorDashboard/pages/LandingPage'
import "./App.css"; 
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './vendorDashboard/components/NotFound';

export default function App() {
  return (
      <Routes>
        <Route  path='/'  element={<LandingPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
  )
}
