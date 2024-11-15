const Car = require('../models/Car');
const {uploadOnCloudinary} = require('../utils/cloudinary');

const createCar = async (req, res) => {
  console.log(req.files);
  try {
    const { title, description, tags, car_type, company, dealer } = req.body;
    const images = [];

    
    if (req.files) {
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result && result.url) {
          images.push(result.url); 
        }
      }
    }

    
    const processedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

    const car = new Car({
      title,
      description,
      tags: processedTags,
      images,
      car_type,
      company,
      dealer,
    });

    await car.save();
    res.status(201).json({ message: 'Car created successfully', car });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Failed to create car' });
  }
};

const updateCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, tags, car_type, company, dealer } = req.body;
    let images;

    
    if (req.files && req.files.length > 0) {
      images = [];
      for (const file of req.files) {
        const result = await uploadOnCloudinary(file.path);
        if (result && result.url) {
          images.push(result.url);
        }
      }
    } else {
      
      const existingCar = await Car.findById(id);
      images = existingCar.images;
    }

    
    const processedTags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());

    
    const car = await Car.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tags: processedTags,
        car_type,
        company,
        dealer,
        images, 
      },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    res.status(200).json({ message: 'Car updated successfully', car });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ error: 'Failed to update car' });
  }
};




const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Failed to retrieve cars' });
  }
};

const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({ error: 'Failed to retrieve car' });
  }
};

const deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
};

module.exports = { createCar, getAllCars, getCarById, deleteCarById ,updateCarById};
