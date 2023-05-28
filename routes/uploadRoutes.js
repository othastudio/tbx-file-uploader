const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const imageView = require('../views/imageView');

router.post('/', uploadController.uploadImage, imageView.getImagePath);

module.exports = router;
