'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { CrudService } = require('naf-framework-mongoose').Services;

class ItemsService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.model = ctx.model.Items;
    this.mCategory = this._model(ctx.model.Category);
    this.mItems = this._model(ctx.model.Items);
  }

  async create({ category }, data) {
    assert(category);
    assert(data);

    // TODO:检查类别是否存在
    const c = await this.mCategory._findOne({ code: category });
    if (!c) {
      this.logger.error(`code category: ${category} not exist!`);
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '类别信息不存在');
    }

    // TODO:保存数据
    const res = await this._create({ ...data, category });
    return res;
  }

  async delete({ category, code }) {
    assert(category, 'category不能为空');
    assert(code, 'code不能为空');

    await this.mItems._remove({ category, code });
    return 'deleted';
  }


}

module.exports = ItemsService;
