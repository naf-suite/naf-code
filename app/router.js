'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.all('/demo', controller.home.demo);

  // 字典分类
  router.get('/category/list', controller.category.list);
  router.get('/category/:id/fetch', controller.category.fetch);
  router.post('/category/create', controller.category.create);
  router.post('/category/:id/update', controller.category.update);
  router.post('/category/:id/delete', controller.category.delete);

  // 字典项
  router.get('/items/:category/list', controller.items.list);
  router.get('/items/:id/fetch', controller.items.fetch);
  router.post('/items/:category/create', controller.items.create);
  router.post('/items/:id/update', controller.items.update);
  router.post('/items/:id/delete', controller.items.delete);
};
