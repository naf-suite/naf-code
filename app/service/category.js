'use strict';

const assert = require('assert');
const { isNullOrUndefined } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { CrudService } = require('naf-framework-mongoose').Services;

class CategoryService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_category');
    this.model = ctx.model.Category;
    this.mItems = this._model(ctx.model.Items);
    this.mCategory = this._model(ctx.model.Category);
  }

  async delete({ code }) {
    assert(code, 'code不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mCategory._findOne({ code });
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);

    // TODO: 检查是否包含字典项数据
    const count = await this.mItems._count({ category: entity.code });
    if (count > 0) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '存在字典项数据，不能删除');
    }

    await this.mCategory._remove({ _id: entity._id });
    return 'deleted';
  }

  async clear({ category }) {
    assert(category, 'category不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mCategory._findOne({ code: category });
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);

    // TODO: 删除字典项数据
    await this.mItems._remove({ category: entity.code });
    return 'cleared';
  }

  // async query({ skip, limit, order } = {}, data = {}) {
  //   // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
  //   const rs = await this.model.find({}, null, {}).exec();
  //   return rs;
  // }

}

module.exports = CategoryService;
