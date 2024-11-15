import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getCarById, deleteCarById ,updateCarById} from '../services/carService';

const CarDetails = () => {
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [newTag, setNewTag] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      const response = await getCarById(id);
      setCar(response.data);
      setFormData(response.data);
    };
    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    await deleteCarById(id);
    navigate('/car-list');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...formData.tags];
    updatedTags[index] = value;
    setFormData({ ...formData, tags: updatedTags });
  };

  const handleAddTag = () => {
    if (newTag) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag('');
    }
  };

  const handleDeleteTag = (index) => {
    const updatedTags = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updatedTags });
  };

  

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
  
    
    updatedFormData.append('title', formData.title);
    updatedFormData.append('description', formData.description);
    updatedFormData.append('car_type', formData.car_type);
    updatedFormData.append('company', formData.company);
    updatedFormData.append('dealer', formData.dealer);
  
    
    const tagsArray = Array.isArray(formData.tags)
      ? formData.tags
      : (formData.tags || '').split(',').map(tag => tag.trim());
  
    tagsArray.forEach(tag => updatedFormData.append('tags', tag));
  
    try {
      console.log(updatedFormData);
      await updateCarById(id, updatedFormData);  
      navigate('/car-list');
    } catch (error) {
      console.error('Error updating car:', error);
    }
  };
  
  
  

  if (!car) return <p>Loading...</p>;

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
      
      {isEditing ? (
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="text-3xl font-semibold mb-4 text-gray-800 w-full p-2 border rounded"
        />
      ) : (
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">{car.title}</h2>
      )}
      
      {isEditing ? (
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="text-gray-600 mb-4 w-full p-2 border rounded"
        />
      ) : (
        <p className="text-gray-600 mb-4">{car.description}</p>
      )}
      
      
      <div className="italic text-gray-600 mb-6">
        <strong>Tags:</strong>
        {isEditing ? (
          <div className="space-y-2 mt-2">
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                  className="p-1 border rounded"
                />
                <button
                  onClick={() => handleDeleteTag(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add new tag"
                className="p-1 border rounded"
              />
              <button
                onClick={handleAddTag}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Add Tag
              </button>
            </div>
          </div>
        ) : (
          <p>{car.tags.join(', ')}</p>
        )}
      </div>

      
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

      
      <div className="mt-6">
        <p className="text-gray-800">
          <strong>Car Type:</strong> {isEditing ? (
            <input
              type="text"
              name="car_type"
              value={formData.car_type}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          ) : car.car_type}
        </p>
        <p className="text-gray-800">
          <strong>Company:</strong> {isEditing ? (
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          ) : car.company}
        </p>
        <p className="text-gray-800">
          <strong>Dealer:</strong> {isEditing ? (
            <input
              type="text"
              name="dealer"
              value={formData.dealer}
              onChange={handleChange}
              className="p-1 border rounded"
            />
          ) : car.dealer}
        </p>
      </div>

    
      <div className="mt-6 flex space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditToggle}
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
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetails;



