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
    console.log('In retrieveInstructorNameOfficePhoneByInstID ');
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

/*
const retrieveInstructorNameOfficePhoneByInstIDJoin = async(id) => {
  try {
    course_items = [];
    console.log('In retrieveInstructorNameOfficePhoneByInstIDJoin ');
    const result = await knex('instructor as i')
    .join('section as s', 's.section_of_course', 'c.Ccode')
    .select ('c.CName','c.CDesc', 's.SecNo', 's.Building')
    .where({ CCode: id})
    .first();
    course_items.push({"CName":result.CName}, {"CDesc":result.CDesc}, {"SecNo":result.SecNo}, {"Building":result.Building });
    console.log('CName:  ' + result.CName + 'CLevel: ' + result.CLevel + 'CDesc: ' + result.CDesc);
    console.log('course_items[0]  ' + course_items[0] + 
      'course_items[1]  ' + course_items[1] + 
      'course_items[2]  ' + course_items[2]);
    return result ? JSON.stringify(course_items) : null;
  } 
  catch (error) {
    console.error('Error fetching CName: ', error);
  }
};*/

module.exports =  { retrieveInstructorByInstID, retrieveInstructorNameOfficePhoneByInstID };