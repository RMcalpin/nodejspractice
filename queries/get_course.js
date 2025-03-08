const Course = require('../models/course');

async function getAllCourses() {
    try {
      const courses = await Course.query();
      console.log(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
}
  
getAllCourses();