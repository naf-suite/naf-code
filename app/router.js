'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.all('/demo', controller.home.demo);

  // 开放接口
  router.get('/api/xzqh/list', controller.api.xzqh);
  router.get('/api/:category/list', controller.api.list);
  router.get('/api/:category/:group/list', controller.api.list);
  router.get('/api/:category/fetch', controller.api.fetch);
  router.get('/api/:category/:group/fetch', controller.api.fetch);

  // 字典分类
  router.get('/category/list', controller.category.list);
  router.get('/category/fetch', controller.category.fetch);
  router.post('/category/create', controller.category.create);
  router.post('/category/update', controller.category.update);
  router.get('/category/delete', controller.category.delete);

  // 字典项
  router.get('/items/:category/list', controller.items.list);
  router.get('/items/:category/fetch', controller.items.fetch);
  router.post('/items/:category/create', controller.items.create);
  router.post('/items/:category/update', controller.items.update);
  router.get('/items/:category/delete', controller.items.delete);
  router.get('/items/:category/clear', controller.items.clear);
};
