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

module.exports =  { retrieveInstructorByInstID };