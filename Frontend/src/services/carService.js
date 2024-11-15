import axios from 'axios';
import { BACKEND_URL } from '../constant';
const createCar=async (data)=>{
  try {
    const response=await axios.post(`${BACKEND_URL}/api/car/cars`,data,{
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log( error.response?.data || error.message)
    return error;
  }
}
const getAllCars=async ()=>{
  try {
    const response=await axios.get(`${BACKEND_URL}/api/car/car-list`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response?.data || error.message)
    return error;
  }
}
const getCarById=async (id)=>{
  try {
    const response=await axios.get(`${BACKEND_URL}/api/car/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response?.data || error.message)
    return error;
  }
}

const deleteCarById=async (id)=>{
  try {
    const response=await axios.delete(`${BACKEND_URL}/api/car/${id}`,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response?.data || error.message)
    return error;
  }
}

export {createCar,getAllCars,getCarById,deleteCarById};