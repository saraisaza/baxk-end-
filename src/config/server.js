const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// const emailController = require('../src/controllers/email-controller.js');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  require ("./mark_completed_watch");
  require ("./last_notification_watch");
  require ("./emparejado_watch");
}

//inicializations
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Settings
app.set('port', process.env.PORT || 5002);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get(`${process.env.API_VERSION_ROUTE}/`, (req, res) => {
  res.send('Test server for education purposes');
});
app.use(process.env.API_VERSION_ROUTE, require("./routes/server-routes"));

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
