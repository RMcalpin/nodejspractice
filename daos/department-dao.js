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

var department_items = [];
const department_map = new Map();

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
      console.error('Error fetching DeptName: ', error);
    }
};

const retrieveDepartmentNameOfficePhoneByDcode = async(id) => {
  try {
    console.log('In retrieveDepartmentNameOfficePhoneByDcode ');
    department_items = [];
    const result = await knex('department')
    .select ('DeptName','DeptOffice','DeptPhone')
    .where({ DeptCode: id})
    .first();
    department_items.push({"DeptName":result.DeptName},{"DeptOffice": result.DeptOffice}, {"DeptPhone":result.DeptPhone});
    console.log('DeptName:  ' + result.DeptName + 'DeptOffice: ' + result.DeptOffice + 'DeptPhone: ' + result.DeptPhone);
    console.log('department_items[0]  ' + department_items[0] + 
      'department_items[1]  ' + department_items[1] + 
      'department_items[2]  ' + department_items[2]);
    return result ? JSON.stringify(department_items) : null;
  } 
  catch (error)
  {
    console.error('Error fetching DeptName: ', error);
  }
};

module.exports =  { retrieveDepartmentByDcode, retrieveDepartmentNameOfficePhoneByDcode };