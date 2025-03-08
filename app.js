const express = require('express')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile.js').development;
const knex = Knex(knexConfig);
const app = express()
const port = 3000
const courses = require('./routes/courses')
const instructors = require('./routes/instructors')
const departments = require('./routes/departments')

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'unzipped')));
app.use('/courses', courses)
app.use('/instructors', instructors)
app.use('/departments', departments)

Model.knex(knex);
console.log('Database connection established.');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});