'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { CrudService } = require('naf-framework-mongoose').service;

class ItemsService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.model = ctx.model.Items;
    this.mCategory = ctx.model.Category;
  }

  async create({ category }, data) {
    assert(category);
    assert(data);

    // TODO:检查类别是否存在
    const c = await this._findOne({ code: category }, null, null, this.mCategory);
    if (!c) {
      this.logger.error(`code category: ${category} not exist!`);
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '类别信息不存在');
    }

    // TODO:保存数据
    const res = await this._create({ ...data, category });
    return res;
  }

}

module.exports = ItemsService;
