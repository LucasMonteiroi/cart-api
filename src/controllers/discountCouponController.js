const discountCouponService = require('../services/discountCouponService');

class DiscountCouponController {
  async create(req, res) {
    const discountCoupon = req.body;
    const createdDiscountCoupon = await discountCouponService.create(
      discountCoupon
    );
    return res.json(createdDiscountCoupon);
  }

  async update(req, res) {
    const discountCoupon = req.body;
    const updatedDiscountCoupon = await discountCouponService.update(
      discountCoupon.id,
      discountCoupon
    );
    return res.json(updatedDiscountCoupon);
  }

  async find(req, res) {
    const discountCoupons = await discountCouponService.findAll();
    return res.json(discountCoupons);
  }

  async findById(req, res) {
    const discountCouponId = req.params.id;
    const discountCoupon = await discountCouponService.findById(
      discountCouponId
    );
    return res.json(discountCoupon);
  }

  async delete(req, res) {
    const discountCouponId = req.params.id;
    const deleted = await discountCouponService.deleteById(discountCouponId);
    return res.json({ isDeleted: deleted });
  }
}

module.exports = new DiscountCouponController();
