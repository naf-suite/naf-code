'use strict';

const assert = require('assert');
const { CrudService, NafModel } = require('naf-framework-mongoose').Services;
const { isNullOrUndefined } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;

class ApiService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.model = ctx.model.Items;
    this.mItems = new NafModel(ctx, ctx.model.Items);
    this.mCategory = new NafModel(ctx, ctx.model.Category);
  }

  async list({ category, group } = {}) {
    assert(category, '类别不能为空');
    // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
    const c = await this.mCategory._findOne({ $or: [{ code: category }, { key: category }] });
    if (isNullOrUndefined(c)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '字典类别不存在');
    }
    const rs = await this.mItems._find({ category: c.code, group }, { code: 1, name: 1 }, { sort: { order: -1, code: 1 } });
    return rs;
  }

}

module.exports = ApiService;
