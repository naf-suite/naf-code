'use strict';

const assert = require('assert');
const { isNullOrUndefined } = require('naf-core').Util;
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { CrudService } = require('naf-framework-mongoose/lib/service');

class CategoryService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_category');
    this.mItems = this.ctx.model.Items;
    this.mCategory = this.ctx.model.Category;
    this.model = this.mCategory;
  }

  async delete({ code }) {
    assert(code, 'code不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mCategory.findOne({ code }).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);

    // TODO: 检查是否包含字典项数据
    const count = await this.mItems.count({ category: entity.code }).exec();
    if (count > 0) {
      throw new BusinessError(ErrorCode.SERVICE_FAULT, '存在字典项数据，不能删除');
    }

    await this.mCategory.deleteOne({ _id: entity._id }).exec();
    return 'deleted';
  }

  async clear({ category }) {
    assert(category, 'category不能为空');

    // TODO:检查数据是否存在
    const entity = await this.mCategory.findOne({ code: category }).exec();
    if (isNullOrUndefined(entity)) throw new BusinessError(ErrorCode.DATA_NOT_EXIST);

    // TODO: 删除字典项数据
    await this.mItems.deleteMany({ category: entity.code }).exec();
    return 'cleared';
  }

  // async query({ skip, limit, order } = {}, data = {}) {
  //   // const rs = await this._find(trimData(data), null, trimData({ skip, limit, sort: order && { [order]: 1 } }));
  //   const rs = await this.model.find({}, null, {}).exec();
  //   return rs;
  // }

}

module.exports = CategoryService;
