// import React from 'react'
// import {BrowserRouter,Routes,Route} from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register';
// import CarList from './components/CarList';
// import AddNewCar from './components/AddNewCar';

// const App = () => {
//   return (
//     <BrowserRouter>
//     <Routes>
//       <Route path='/' element={<Login/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/register' element={<Register/>}/>
//       <Route path='/car-list' element={<CarList/>}/>
//       <Route path='/cars/new' element={<AddNewCar/>}/>
//     </Routes>
//     </BrowserRouter>
//   )
// }

// export default App

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import AddNewCar from './components/AddNewCar';

import CarDetails from './components/CarDetails';
// import EditCar from './components/EditCar'; // Import EditCar component if you need an Edit functionality

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Car Routes */}
        <Route path="/car-list" element={<CarList />} /> {/* Car List Page */}
        <Route path="/cars/new" element={<AddNewCar />} /> {/* Add New Car Page */}
        
        {/* Dynamic Routes */}
        <Route path="/cars/:id" element={<CarDetails />} /> {/* Car Detail Page */}
        {/* <Route path="/cars/:id/edit" element={<EditCar />} /> Edit Car Page */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
