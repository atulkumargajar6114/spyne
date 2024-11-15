const express = require('express');
const {createCar,getAllCars,getCarById,deleteCarById} = require('../controllers/carController');
const upload = require('../middleware/upload');
const router = express.Router();
const verifyUserLoggedInOrNot=require('../middleware/verifyUserLoggedInOrNot');


router.post('/cars',verifyUserLoggedInOrNot,upload.array('images', 10),createCar);
router.get('/car-list',verifyUserLoggedInOrNot,getAllCars);
router.get('/:id',verifyUserLoggedInOrNot, getCarById);
router.delete('/:id',verifyUserLoggedInOrNot, deleteCarById);


// router.put('/cars/:id', upload.array('images', 10), carController.updateCar);

module.exports = router;
