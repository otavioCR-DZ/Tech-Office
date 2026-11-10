const { Router } = require('express');
const controller = require('../controllers/productController');

const router = Router();

router.get('/', controller.list);
router.get('/categories', controller.categories); // antes de '/:id'
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
