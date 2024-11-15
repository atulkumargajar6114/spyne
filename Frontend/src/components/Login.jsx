import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/userAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    const response=await login(formData);
    console.log(response);
    
    if (response.status === 200) { 
      const { token, name,userId } = response.data; 
      localStorage.setItem('token', token); 
      localStorage.setItem('username',name);
      localStorage.setItem('userId',userId);
      setFormData({ email: '', password: '' }); 
      setErrorMessage('');
      navigate('/car-list')
      
    } else {
      setErrorMessage(response.data.message || 'Login failed'); 
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 bg-gradient-to-r from-blue-50 to-cyan-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-primary font-bold text-center mb-6">Login</h2>
        
        
        
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-[#1D3557] text-white font-semibold w-full py-2 px-4 rounded-lg hover:bg-[#4FC3F7] transition"
          >
            Login
          </button>
        </form>

        

        
        <div className="text-center mt-4">
          <p>Not registered yet?{' '}
            <Link to="/register" className="text-[#4FC3F7] hover:underline">
              Go to Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;