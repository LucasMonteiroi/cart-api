const express = require('express');

const router = express.Router();
const discountCouponController = require('../controllers/discountCouponController');

router.get('/', async (req, res) => discountCouponController.find(req, res));
router.get('/:id', async (req, res) =>
  discountCouponController.findById(req, res)
);
router.post('/', async (req, res) => discountCouponController.create(req, res));
router.put('/:id', async (req, res) =>
  discountCouponController.update(req, res)
);
router.delete('/:id', async (req, res) =>
  discountCouponController.delete(req, res)
);

module.exports = router;
