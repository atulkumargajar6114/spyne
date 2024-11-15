const express = require('express');
const {createCar,getAllCars,getCarById,deleteCarById,updateCarById} = require('../controllers/carController');
const upload = require('../middleware/upload');
const router = express.Router();
const verifyUserLoggedInOrNot=require('../middleware/verifyUserLoggedInOrNot');


router.post('/cars',verifyUserLoggedInOrNot,upload.array('images', 10),createCar);
router.get('/car-list',verifyUserLoggedInOrNot,getAllCars);
router.get('/:id',verifyUserLoggedInOrNot, getCarById);
router.delete('/:id',verifyUserLoggedInOrNot, deleteCarById);
router.put('/:id', verifyUserLoggedInOrNot, upload.array('images', 10), updateCarById);






module.exports = router;
