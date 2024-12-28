var express = require('express');
const {retrieveInstructorByInstID, retrieveInstructorNameOfficePhoneByInstID} = require('../daos/instructor-dao');
var router = express.Router();
module.exports = router;

var instructors = [
  { id: 0, name: 'Po' }
  , { id: 1, name: 'Kanji' }
  , { id: 2, name: 'Zhang' }
];

/* /instructors API call.  This API call gets the complete table of instructors */
router.get('/', (req, res) => 
   {res.send('Instructors are: ' + JSON.stringify(instructors))});

/* /instructor by id API call.  This API call receives a path parameter in :id, looks up the instructor in the
    instructor table using the id, and returns the instructor name */

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const instructorName = await retrieveInstructorByInstID (id);
    if (instructorName) {
      res.json ({instructorName});
    }
    else
      res.status(404).json({error: 'Instructor not found' });
  }
  catch (error) {
    res.status(500).json({error: 'Internal Server Error' });
  }
});
/*  This statement exports the router */

router.get('/All/:id', async (req, res) => {
  
  const { id } = req.params;
 
  try {
    const instructorName = await retrieveInstructorNameOfficePhoneByInstID (id);
    if (instructorName) {
      res.json ({instructorName});
    } 
    else
      res.status(404).json({error: 'Course not found' });
  }
  catch (error) {
    res.status(500).json({error: 'Internal Server Error' });
  }
});

module.exports = router;