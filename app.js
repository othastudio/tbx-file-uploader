require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');

const port = process.env.PORT || 3333;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/images', express.static(path.join(__dirname, 'uploads')));

app.use('/upload', uploadRoutes);

app.listen(port, () => {
  console.log(`Server is running on  ${process.env.HOST}:${port} 🚀`);
});
