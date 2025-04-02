const { Model, ref } = require('objection');

class Department extends Model {
  static get tableName() {
    return 'department'; // Make sure this matches your actual table name
  }

  static get relationMappings() {
    return {
      course: {
        relation: Model.HasManyRelation,
        modelClass: Course,
        join: {
          from: 'persons.id',
          to: 'animals.ownerId'
        }
      },
    };
  }
}

module.exports = Department;