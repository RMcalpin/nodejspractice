const { Model } = require('objection');

class Course extends Model {
  static get tableName() {
    return 'course'; // Make sure this matches your actual table name
  }
}

module.exports = Course;