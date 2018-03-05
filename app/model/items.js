'use strict';
const Schema = require('mongoose').Schema;

const SchemaDefine = {
  code: { type: String, required: true, maxLength: 64 },
  name: { type: String, required: true, maxLength: 128 },
  category: { type: String, required: true, maxLength: 64 }, // 字典类别
  group: { type: String, required: true, maxLength: 64 }, // 数据子类/分组
  order: Number,
  status: { type: String, maxLength: 64 },
};
const schema = new Schema(SchemaDefine);
schema.index({ code: 1 });
schema.index({ category: 1 });
schema.index({ category: 1, group: 1 });
schema.index({ category: 1, code: 1 }, { unique: true });
schema.index({ category: 1, order: 1 });
schema.index({ category: 1, group: 1, order: 1 });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('CodeItems', schema, 'naf_code_items');
};
