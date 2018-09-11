'use strict';

const Controller = require('egg').Controller;
const meta = require('./category.json');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class CategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.category;
  }
}

module.exports = CrudController(CategoryController, meta);
