var mysql2 = require('mysql2');
const objection = require("objection");
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'password123',
    database: 'course_selection',
  },
});

var instructor_items = [];
const instructor_map = new Map();

const retrieveInstructorByInstID = async(id) => {
  try {
    const result = await knex('instructor')
    .select('InstName')
    .where({ InstID: id})
    .first();
    console.log('InstName:  ' + result.InstName);
    return result ? result.InstName : null;
  } catch (error) {
    console.error('Error fetching InstID: ', error);
  }
};

const retrieveInstructorNameOfficePhoneByInstID = async(id) => {
  try {
    console.log('In retrieveCourseNameLevelDescByCcode ');
    instructor_items = [];
    const result = await knex('instructor')
    .select ('InstName','InstOffice','InstPhone')
    .where({ InstID: id})
    .first();
    instructor_items.push({"Inst Name":result.InstName},{"Inst Office": result.InstOffice}, {"Inst Phone":result.InstPhone});
    console.log('InstName: ' + result.InstName + ', CLevel: ' + result.InstOffice + ', CDesc: ' + result.InstPhone);
    console.log('instructor_items[0]  ' + instructor_items[0] + 
      'instructor_items[1]  ' + instructor_items[1] + 
      'instructor_items[2]  ' + instructor_items[2]);
    return result ? JSON.stringify(instructor_items) : null;
  } 
  catch (error) {
    console.error('Error fetching InstName: ', error);
  }
};

module.exports =  { retrieveInstructorByInstID, retrieveInstructorNameOfficePhoneByInstID };