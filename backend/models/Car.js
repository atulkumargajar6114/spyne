const mongoose = require('mongoose');
const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String], 
      required: true,
    },
    images: {
      type: [String], 
      required: true,
    },
    car_type: {
      type: String, 
      required: true,
    },
    company: {
      type: String, 
      required: true,
    },
    dealer: {
      type: String, 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);
const Car = mongoose.model('Car', carSchema);
module.exports = Car;
