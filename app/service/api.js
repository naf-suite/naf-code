'use strict';

const assert = require('assert');
const { CrudService } = require('naf-framework-mongoose/lib/service');
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const _ = require('lodash');

class ApiService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.mItems = this.ctx.model.Items;
    this.mCategory = this.ctx.model.Category;
    this.model = this.mItems;
  }

  async list({ category, group } = {}) {
    assert(category, '类别不能为空');
    // const rs = await this.model.find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } })).exec();
    const c = await this.mCategory.findOne({ $or: [{ code: category }, { key: category }] }).exec();
    if (isNullOrUndefined(c)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '字典类别不存在');
    }
    const rs = await this.mItems.find(trimData({ category: c.code, group }), { code: 1, name: 1, _id: -1 }, { sort: { order: -1, code: 1 } }).exec();
    return rs.map(p => ({ code: p.code, name: p.name }));
  }

  async xzqh({ parent, level } = {}) {
    assert(isNullOrUndefined(parent) || /^\d{6}$/.test(parent), 'parent必须为有效的行政区划代码');
    assert(level, 'level不能为空');
    if (!_.isNumber(level)) level = Number(level);
    assert(level >= 0 && level <= 3, 'level只能为0~3的数字');

    const filter = { category: '31' };
    if (level > 0) {
      const suffix = '000000'.substr(0, (3 - level) * 2);
      let prefix = '';
      if (!isNullOrUndefined(parent) && level > 1) prefix = parent.substr(0, (level - 1) * 2);
      filter.code = { $regex: `${prefix}\\d{2}(?<!00)${suffix}` };
    }
    const rs = await this.mItems.find(filter, { code: 1, name: 1, _id: -1 }, { sort: { order: -1, code: 1 } }).exec();
    return rs.map(p => ({ code: p.code, name: p.name }));
  }

  async fetch({ category, group, code } = {}) {
    assert(category, 'category不能为空');
    assert(code, 'code不能为空');
    // const rs = await this.model.find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } })).exec();
    const c = await this.mCategory.findOne({ $or: [{ code: category }, { key: category }] }).exec();
    if (isNullOrUndefined(c)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '字典类别不存在');
    }
    const rs = await this.mItems.findOne({ category: c.code, group, code }, { code: 1, name: 1, _id: -1 }).exec();
    return rs;
  }
}

module.exports = ApiService;
