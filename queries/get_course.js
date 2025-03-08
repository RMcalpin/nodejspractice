const Course = require('../models/course');

const allCourses = async() => {
    try {
      const courses = await Course.query();
      console.log(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
}

module.exports =  { allCourses };
