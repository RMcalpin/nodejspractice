const { Model } = require('objection');

class Section extends Model {
  static get tableName() {
    return 'section';
  }
}

module.exports = Section;