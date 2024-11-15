

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import AddNewCar from './components/AddNewCar';

import CarDetails from './components/CarDetails';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        
        <Route path="/car-list" element={<CarList />} /> 
        <Route path="/cars/new" element={<AddNewCar />} /> 
        
        
        <Route path="/cars/:id" element={<CarDetails />} /> 
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
