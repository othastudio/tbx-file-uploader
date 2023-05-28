const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // Adjust file size limit as needed
}).single('image'); // 'image' should match the field name in the form data

function uploadImage(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Pass the uploaded file path to the next middleware/controller
    req.filePath = req.file.path;
    next();
  });
}

module.exports = { uploadImage };
