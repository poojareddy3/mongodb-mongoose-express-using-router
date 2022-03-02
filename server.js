const express = require('express');
const routes = require('./routes');
const db = require('./db');
const logger = require('morgan'); //morgan is a debugger tool

const PORT = process.env.PORT || 3000;

const app = express();

//we need to use both methods below to do CRUD successfully
app.use(express.json());//parse the data to json...because backend send the data in json
app.use(express.urlencoded({ extended: false })); //parses what we send out..

app.use(logger('dev'));

//uses the routes
app.use('/api', routes);

db.on('error', console.error.bind(console, 'MongoDB Connection error:'));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));