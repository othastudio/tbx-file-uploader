const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Create multer upload instance
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // Adjust file size limit as needed
}).single('image'); // 'image' should match the field name in the form data

// Define the route for file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle any upload errors
      return res.status(500).json({ error: err.message });
    }

    // Return the file path
    res.json({ path: req.file.path });
  });
});

// Define the route to serve uploaded images
app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'uploads', filename);

  // Check if the file exists
  if (fs.existsSync(imagePath)) {
    // Read the file as a stream and pipe it to the response
    const stream = fs.createReadStream(imagePath);
    stream.pipe(res);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

// Start the server
const port = 3333; // Choose a port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
