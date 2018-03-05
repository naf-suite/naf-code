'use strict';

const { CrudService } = require('naf-framework-mongoose').Services;

class ApiService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.model = ctx.model.Items;
  }
}

module.exports = ApiService;
