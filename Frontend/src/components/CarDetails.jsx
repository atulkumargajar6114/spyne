// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// // import { getCarById, deleteCar } from '../services/carService';

// const CarDetails = () => {
//   const [car, setCar] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCar = async () => {
//       // const response = await getCarById(id);
//       setCar(response.data);
//     };
//     fetchCar();
//   }, [id]);

//   const handleDelete = async () => {
//     await deleteCar(id);
//     navigate('/cars');
//   };

//   if (!car) return <p>Loading...</p>;

//   return (
//     <div className="p-6 bg-white">
//       <h2 className="text-2xl font-bold mb-4">{car.title}</h2>
//       <p>{car.description}</p>
//       <p className="italic">Tags: {car.tags.join(', ')}</p>
//       <div className="mt-4">
//         <button onClick={() => navigate(`/cars/${id}/edit`)} className="bg-yellow-500 text-white py-1 px-4 mr-2 rounded">
//           Edit
//         </button>
//         <button onClick={handleDelete} className="bg-red-500 text-white py-1 px-4 rounded">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CarDetails;
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCarById,deleteCarById } from '../services/carService';

// Mocked car data (replace this with a real API call later)
const exampleCar = {
  _id: "1",
  title: "2022 Tesla Model S",
  description: "A luxury electric sedan with impressive range and performance.",
  images: [
    "https://www.shutterstock.com/image-photo/mpv-car-suspension-rear-drive-600nw-2501549417.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1eHA6oqIndVaJ5p7sHhokwcFg6keUi9kfw&s",
    "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-96639860/96639860.jpg",
    "https://imgd-ct.aeplcdn.com/664x415/n/cw/ec/166487/xuv700-right-front-three-quarter-2.jpeg?isig=0&q=80",
  ],
  car_type: "Electric Sedan",
  company: "Tesla",
  dealer: "Tesla Showroom Downtown",
  tags: ["electric", "sedan", "luxury", "2022", "Tesla"],
}

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const { id } = useParams();
 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      // Here you can replace it with your real API call
      const response = await getCarById(id);
      console.log(response.data);
      setCar(response.data);
      // Using mocked car data
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    // Call your API to delete the car
    await deleteCarById(id);
    navigate('/car-list'); // Navigate back to the car list
  };

  if (!car) return <p>Loading...</p>; // Show loading if car data is not fetched yet

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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Car Title and Description */}
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">{car.title}</h2>
      <p className="text-gray-600 mb-4">{car.description}</p>
      <p className="italic text-gray-600 mb-6">Tags: {car.tags.join(', ')}</p>

      {/* Image Slider */}
      <div className="mt-6">
        <h3 className="font-semibold text-xl text-gray-800 mb-4">Car Images</h3>
        <Slider {...sliderSettings}>
          {car.images.map((image, index) => (
            <div key={index} className="h-72 md:h-96">
              <img
                src={image}
                alt={`Car Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Additional Information */}
      <div className="mt-6">
        <p className="text-gray-800"><strong>Car Type:</strong> {car.car_type}</p>
        <p className="text-gray-800"><strong>Company:</strong> {car.company}</p>
        <p className="text-gray-800"><strong>Dealer:</strong> {car.dealer}</p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => navigate(`/cars/${id}/edit`)}
          className="bg-yellow-500 text-white py-2 px-6 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CarDetails;



