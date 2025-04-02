var express = require('express');
var router = express.Router();
const {retrieveCourseByCcode, retrieveCourseNameLevelDescByCcode, retrieveCourseNameLevelDescByCcodeJoin, insertCourse, retrieveCourseAndDepartmentNamesByModel} = require('../daos/course-dao.js');
//const retrieveCourseNameLevelDescByCcode = require('../daos/course-dao.js');
const getCourseFromDB = require('../daos/course-dao.js');



var courses = [
  { id: 0, name: 'Advanced Networking' }
  , { id: 1, name: 'Database Systems' }
  , { id: 2, name: 'Computer Organization' }
];

function getCourse (req, res, next) {
  console.log('req.params.id  ' + req.params.id);
  var course = courses[req.params.id];  
  req.course = course;
  next();
}

/* /courses (home) API call.  This API call gets the complete table of courses */
router.get('/', (req, res) => 
   {res.send('Courses are: ' + JSON.stringify(courses))});

router.post('/insert/:id', async (req, res) => {
  try {
    console.log('In post  ');
    const retCode = await insertCourse (req.body);
    console.log('retCode:  ' + retCode);
    if (retCode==="success") {
      res.status(200).json("insert successful");
    }
    else
    {
      res.status(404).json({error: 'Insert not successful' });
    }
  }

  catch (error) {
  res.status(500).json({error: 'Internal Server Error' })
  }
})


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {

    console.log('In Get  ');
    console.log('req.params.id  ' + req.params.id);
  const courseName = await retrieveCourseByCcode (id);
  if (courseName) {
    res.json ({courseName});
  } else
    res.status(404).json({error: 'Course not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});

router.get('/All/:id', async (req, res) => {
  
  const { id } = req.params;
 
  try {
    console.log('In Get/All  ');
    console.log('req.params.id  ' + req.params.id);
  const courseName = await retrieveCourseNameLevelDescByCcode (id);
  if (courseName) {
    res.json ({courseName});
  } else
    res.status(404).json({error: 'Course not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});

router.get('/course_section/:id', async (req, res) => {
  
  const { id } = req.params;
 
  try {
    console.log('In Get/course_section  ');
    console.log('req.params.id  ' + req.params.id);
  const course_section = await retrieveCourseNameLevelDescByCcodeJoin (id);
  if (course_section) {
    res.json ({course_section});
  } else
    res.status(404).json({error: 'Course not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});

router.get('/course_department/:id', async (req, res) => {
  
  const { id } = req.params;
 
  try {
    console.log('In Get/course_department  ');
    console.log('req.params.id  ' + req.params.id);
  const course_dept = await retrieveCourseAndDepartmentNamesByModel (id);
  if (course_dept) {
    res.json ({course_dept});
  } else
    res.status(404).json({error: 'Course not found' });
  }
  catch (error) {
  res.status(500).json({error: 'Internal Server Error' });
}
});
/*  This statement exports the router */

module.exports = router;
