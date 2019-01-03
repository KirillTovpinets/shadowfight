const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/game/assets/data/battlefield/scences.json'));
});

module.exports = router;
