import axios from 'axios';
import { BACKEND_URL } from '../constant';
const register=async (data)=>{
  try {
    const response=await axios.post(`${BACKEND_URL}/api/user/register`,data);
    return response;
  } catch (error) {
    console.log('Registration error:', error.response?.data || error.message)
    return error;
  }
}

const login =async (data)=>{
  try {
    const response=await axios.post(`${BACKEND_URL}/api/user/login`,data);
    return response;
  } catch (error) {
    return error;
  }
}
export {register,login};