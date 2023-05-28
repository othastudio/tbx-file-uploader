function getImagePath(req, res) {
  res.json({ path: `/images/${req.file.filename}` });
}

module.exports = { getImagePath };
