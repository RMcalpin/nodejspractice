const { Model } = require('objection');

class Instructor extends Model {
  static get tableName() {
    return 'instructor';
  }
  
  static get idColumn() {
    return 'InstID';  // Set the correct primary key
  }
}

module.exports = Instructor;