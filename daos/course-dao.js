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

const retrieveCourseByCcode = async(id) => {
  try {
    console.log('In retrieveCourseByCcode ');
    const result = await knex('course')
    .select('CName')
    .where({ CCode: id})
    .first();
    console.log('CName:  ' + result.CName);
    return result ? result.CName : null;
  } catch (error) {
    console.error('Error fetching CName: ', error);
  }
  };

  const retrieveCourseNameLevelDescByCcode = async(id) => {
    try {
      console.log('In retrieveCourseNameLevelDescByCcode ');
      const result = await knex('course')
      .select ('CName','CLevel','CDesc')
      .where({ CCode: id})
      .first();
      course_items.push({"CName":result.CName},{"CLevel": result.CLevel}, {"CDesc":result.CDesc});
      console.log('CName:  ' + result.CName + 'CLevel: ' + result.CLevel + 'CDesc: ' + result.CDesc);
      console.log('course_items[0]  ' + course_items[0] + 
        'course_items[1]  ' + course_items[1] + 
        'course_items[2]  ' + course_items[2]);
      return result ? JSON.stringify(course_items) : null;

    } catch (error) {
      console.error('Error fetching CName: ', error);
    }
    };

    const retrieveCourseNameLevelDescByCcodeJoin = async(id) => {
      try {
        course_items = [];
        console.log('In retrieveCourseNameLevelDescByCcodeJoin ');
        const result = await knex('course as c')
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
  
      } catch (error) {
        console.error('Error fetching CName: ', error);
      }
      };

module.exports =  { retrieveCourseNameLevelDescByCcode, retrieveCourseByCcode, retrieveCourseNameLevelDescByCcodeJoin};

/*
var jsonArg1 = new Object();
jsonArg1.name = "CName";
jsonArg1.value = result.CName;
var jsonArg2 = new Object();
jsonArg2.name = "CLevel";
jsonArg2.value = result.CLevel;
var jsonArg3 = new Object();
jsonArg3.name = "CDesc";
jsonArg3.value = result.CDesc;
course_map.set("CName", result.CName);
course_map.set("CLevel", result.CLevel);
course_map.set("CDesc", result.CDesc);
*/
/*knex.select('CName').from('course').where('CCode', '=', '33111')
.then (function(rows) {console.log(rows);});*/

/*var course_promise = knex.select('CName').from('course').where('CCode', '=', '33111')
.then (function(row_parm) {console.log(row_parm)});

console.log('course_promise:  ' + course_promise);
*/

//var course_name_query = knex.select('CName').from('course').where('CCode', '=', '33111');

//console.log('course_name_query:  ' + course_name_query);

/*course_name_query
.then (function(rows) {console.log(rows);});*/
