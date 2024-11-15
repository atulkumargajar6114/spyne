import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllCars } from '../services/carService';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const fetchCars = async () => {
    try {
      const response=await getAllCars();
      console.log(response.data);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const handleSearch = () => {
    const filteredCars = exampleCars.filter(
      (car) =>
        car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setCars(filteredCars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Car Collection</h2>
      <div className="max-w-2xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="bg-white border rounded-lg shadow-lg overflow-hidden">
            <Link to={`/cars/${car._id}`}>
              <h3 className="text-xl font-semibold px-4 pt-4 text-gray-800">{car.title}</h3>
              <div className="p-4">
                <Slider {...sliderSettings}>
                  {car.images.map((image, index) => (
                    <div key={index} className="h-48">
                      <img
                        src={image}
                        alt={`Car ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="px-4 pb-4 text-gray-700">
                <p className="text-sm mb-2">{car.description}</p>
                <p className="text-sm italic">Type: {car.car_type}</p>
                <p className="text-sm italic">Company: {car.company}</p>
                <p className="text-sm italic">Dealer: {car.dealer}</p>
                <p className="text-sm italic">Tags: {car.tags.join(', ')}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link
        to="/cars/new"
        className="block mt-8 mx-auto text-center bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add New Car
      </Link>
    </div>
  );
};

export default CarList;




