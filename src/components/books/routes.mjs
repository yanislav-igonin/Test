import Router from 'koa-router';
import controller from './controller';

const router = new Router({
  prefix: '/api/v1/books',
});

router.get('/', controller.list);
// router.post('/', controller.create);
// router.put('/:bookId', controller.update);

export default router.routes();
