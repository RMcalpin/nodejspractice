var express = require('express');
var router = express.Router();
const {retrieveDepartmentByDcode } = require('../daos/department-dao.js');
const getDepartmentFromDB = require('../daos/department-dao.js');

router.get('/', (req, res) => 
   {res.send('Courses are: ' + JSON.stringify(courses))});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log('In Get  ');
    console.log('req.params.id  ' + req.params.id);
  const departmentName = await retrieveDepartmentByDcode (id);
  if (departmentName) {
    res.json ({departmentName});
  } else
    res.status(404).json({error: 'Department not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});

module.exports = router;