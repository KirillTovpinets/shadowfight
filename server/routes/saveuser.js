const express = require('express');
const config = require('../config');

const router = express.Router();

router.use('/', (req, res) => {
  config.database.db().collection('records').insertOne(req.body).then((err, result) => {
    if (err) {
      return res.send({ err });
    }
    return res.send(result);
  });
});

module.exports = router;
