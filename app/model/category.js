'use strict';
const Schema = require('mongoose').Schema;

const SchemaDefine = {
  code: { type: String, required: true, maxLength: 64 },
  name: { type: String, required: true, maxLength: 128 },
  key: { type: String, required: false, maxLength: 64 }, // 检索关键字
  order: Number,
};
const schema = new Schema(SchemaDefine);
schema.index({ code: 1 }, { unique: true });
schema.index({ key: 1 });

module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('CodeCategory', schema, 'naf_code_category');
};
