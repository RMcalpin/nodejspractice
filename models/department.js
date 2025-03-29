const { Model } = require('objection');

class Department extends Model {
  static get tableName() {
    return 'department'; // Make sure this matches your actual table name
  }
}

module.exports = Department;