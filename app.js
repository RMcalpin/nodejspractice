const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const courses = require('./routes/courses')
const instructors = require('./routes/instructors')
const departments = require('./routes/departments')

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/courses', courses)
app.use('/instructors', instructors)
app.use('/departments', departments)

const server = app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`)
})