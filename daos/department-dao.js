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

var course_items = [];
const course_map = new Map();

const retrieveDepartmentByDcode = async(id) => {
    try {
      console.log('In retrieveDepartmentByDcode ');
      const result = await knex('department')
      .select('DeptName')
      .where({ DeptCode: id})
      .first();
      console.log('DeptName:  ' + result.DeptName);
      return result ? result.DeptName : null;
    } 
    catch (error) {
      console.error('Error fetching CName: ', error);
    }
};

module.exports =  { retrieveDepartmentByDcode };