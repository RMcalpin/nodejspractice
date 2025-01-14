var express = require('express');
var router = express.Router();
const {retrieveDepartmentByDcode, insertDepartment, retrieveDepartmentNameOfficePhoneByDcode, retrieveDepartmentNameOfficePhoneByDcodeJoin } = require('../daos/department-dao.js');
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

router.post('/insert/:id', async (req, res) => {
  try {
    console.log('In post  ');
    const retCode = await insertDepartment (req.body);
    console.log('retCode:  ' + retCode);
    if (retCode==="success")
    {
      res.status(200).json("insert successful");
    }
    else
    {
      res.status(404).json({error: 'Insert not successful' });
    }
  }
  catch (error)
  {
  res.status(500).json({error: 'Internal Server Error' })
  }
})

router.get('/All/:id', async (req, res) => {
  const { id } = req.params;
  try {
    console.log('In Get/All  ');
    console.log('req.params.id  ' + req.params.id);
  const departmentName = await retrieveDepartmentNameOfficePhoneByDcode (id);
  if (departmentName) {
    res.json ({departmentName});
  } else
    res.status(404).json({error: 'Department not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});

router.get('/department_instructor/:id', async (req, res) => {
  const { id } = req.params;
  try 
  {
    console.log('In Get/department_instructor  ');
    console.log('req.params.id  ' + req.params.id);
    const department_instructor = await retrieveDepartmentNameOfficePhoneByDcodeJoin (id);
    if (department_instructor) {
      res.json ({department_instructor});
    }
    else
      res.status(404).json({error: 'Department not found' });
  }
  catch (error) {
    res.status(500).json({error: 'Internal Server Error' });
  }
});

module.exports = router;