'use strict';

const Controller = require('egg').Controller;
const meta = require('./items.json');
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class ItemsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.items;
  }
}

module.exports = CrudController(ItemsController, meta);
