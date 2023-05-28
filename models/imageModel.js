const fs = require('fs');
const path = require('path');

function getImageLink(imagePath) {
  if (!fs.existsSync(imagePath)) {
    return null;
  }

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = Buffer.from(imageBuffer).toString('base64');
  const extension = path.extname(imagePath).substring(1);
  const dataUrl = `data:image/${extension};base64,${base64Image}`;

  return dataUrl;
}

module.exports = { getImageLink };
