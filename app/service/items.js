'use strict';

const assert = require('assert');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { CrudService } = require('naf-framework-mongoose/lib/service');

class ItemsService extends CrudService {
  constructor(ctx) {
    super(ctx, 'naf_code_items');
    this.mCategory = this.ctx.model.Category;
    this.mItems = this.ctx.model.Items;
    this.model = this.mItems;
  }

  async create({ category }, data) {
    assert(category);
    assert(data);

    // TODO:检查类别是否存在
    const c = await this.mCategory.findOne({ code: category }).exec();
    if (!c) {
      this.logger.error(`code category: ${category} not exist!`);
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST, '类别信息不存在');
    }

    // TODO:保存数据
    const res = await this.mItems.create({ ...data, category });
    return res;
  }

  async delete({ category, code }) {
    assert(category, 'category不能为空');
    assert(code, 'code不能为空');

    await this.mItems.remove({ category, code }).exec();
    return 'deleted';
  }


}

module.exports = ItemsService;
