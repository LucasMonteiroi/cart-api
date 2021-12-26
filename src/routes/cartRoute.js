const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', async (req, res) => cartController.find(req, res));
router.get('/:id', async (req, res) => cartController.findById(req, res));
router.post('/', async (req, res) => cartController.create(req, res));
router.put('/:id', async (req, res) => cartController.update(req, res));
router.delete('/:id', async (req, res) => cartController.delete(req, res));

router.get('/:id/sumCart', async (req, res) =>
  cartController.sumCart(req, res)
);
router.post('/:id/addProduct', async (req, res) =>
  cartController.addProduct(req, res)
);

router.patch('/:id/removeProduct/:barcode', async (req, res) =>
  cartController.removeProduct(req, res)
);

router.post('/:id/addDiscountCoupon', async (req, res) =>
  cartController.addDiscountCoupon(req, res)
);

router.get('/:id/clear', async (req, res) =>
  cartController.clearCart(req, res)
);

module.exports = router;
