const express = require('express');
const path = require('path');
const mongodb = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('./config');
const saveuser = require('./routes/saveuser');
const scenesApi = require('./api/scenes');
const methodsApi = require('./api/methods');
const taskApi = require('./api/tasks');

const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/save', saveuser);
app.use('/api/scenes', scenesApi);
app.use('/api/methods', methodsApi);
app.use('/api/task', taskApi);
app.get('/records', (req, res) => {
  config.database.db().collection('records').find().toArray((err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/game/index.html'));
});

mongodb.connect(config.dbString, (err, db) => {
  if (err) {
    console.log('Error while connected database');
  } else {
    config.database = db;
    app.listen(config.port, () => {
      console.log(`Server listen on port ${config.port}`);
    });
  }
});
