import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCar } from '../services/carService';

const AddNewCar = () => {
  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: '',
    images: [],
    car_type: '',
    company: '',
    dealer: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + car.images.length <= 10) {
      setCar({
        ...car,
        images: [...car.images, ...files],
      });
    } else {
      alert('You can only upload up to 10 images.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('title', car.title);
    formData.append('description', car.description);
    formData.append('car_type', car.car_type);
    formData.append('company', car.company);
    formData.append('dealer', car.dealer);

    
    const tagsArray = car.tags.split(',').map(tag => tag.trim());
    tagsArray.forEach(tag => formData.append('tags', tag));

    
    car.images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      await createCar(formData);  
      navigate('/car-list');
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800">Add New Car</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter the car title"
            value={car.title}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter car description"
            value={car.description}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-lg font-medium text-gray-700">Tags</label>
          <input
            id="tags"
            type="text"
            name="tags"
            placeholder="Comma-separated tags (e.g., SUV, Electric)"
            value={car.tags}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="car_type" className="block text-lg font-medium text-gray-700">Car Type</label>
          <input
            id="car_type"
            type="text"
            name="car_type"
            placeholder="Enter car type"
            value={car.car_type}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-lg font-medium text-gray-700">Company</label>
          <input
            id="company"
            type="text"
            name="company"
            placeholder="Enter car company"
            value={car.company}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="dealer" className="block text-lg font-medium text-gray-700">Dealer</label>
          <input
            id="dealer"
            type="text"
            name="dealer"
            placeholder="Enter dealer name"
            value={car.dealer}
            onChange={handleChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="images" className="block text-lg font-medium text-gray-700">Images</label>
          <input
            id="images"
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-sm text-gray-500">{car.images.length} image(s) selected</p>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Create Car
      </button>
    </form>
  );
};

export default AddNewCar;
