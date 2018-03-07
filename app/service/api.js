'use strict';

const assert = require('assert');
const { CrudService, NafModel } = require('naf-framework-mongoose').Services;
const { isNullOrUndefined, isNumber } = require('naf-core').Util;
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
    const rs = await this.mItems._find({ category: c.code, group }, { code: 1, name: 1, _id: -1 }, { sort: { order: -1, code: 1 } });
    return rs.map(p => ({ code: p.code, name: p.name }));
  }

  async xzqh({ parent, level } = {}) {
    assert(isNullOrUndefined(parent) || /^\d{6}$/.test(parent), 'parent必须为有效的行政区划代码');
    assert(level, 'level不能为空');
    if (!isNumber(level)) level = Number(level);
    assert(level >= 0 && level <= 3, 'level只能为0~3的数字');

    const filter = { category: '31' };
    if (level > 0) {
      const suffix = '000000'.substr(0, (3 - level) * 2);
      let prefix = '';
      if (!isNullOrUndefined(parent) && level > 1) prefix = parent.substr(0, (level - 1) * 2);
      filter.code = { $regex: `${prefix}\\d{2}(?<!00)${suffix}` };
    }
    const rs = await this.mItems._find(filter, { code: 1, name: 1, _id: -1 }, { sort: { order: -1, code: 1 } });
    return rs.map(p => ({ code: p.code, name: p.name }));
  }

  async fetch({ category, group, code } = {}) {
    assert(category, 'category不能为空');
    assert(code, 'code不能为空');
    // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
    const c = await this.mCategory._findOne({ $or: [{ code: category }, { key: category }] });
    if (isNullOrUndefined(c)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '字典类别不存在');
    }
    const rs = await this.mItems._findOne({ category: c.code, group, code }, { code: 1, name: 1, _id: -1 });
    return rs;
  }
}

module.exports = ApiService;
