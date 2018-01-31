'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'naf code service';
  }

  async demo() {
    this.ctx.success({ data: 'ok' });
  }
}

module.exports = HomeController;
