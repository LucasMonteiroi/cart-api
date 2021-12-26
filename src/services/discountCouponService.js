const MongodbAdapter = require('../adapters/mongodbAdapter');
const discountCouponSchema = require('../models/discountCoupon');

class DiscountCouponService {
  async create(discountCoupon) {
    return await MongodbAdapter.create(discountCouponSchema, discountCoupon);
  }

  async update(discountCouponId, payload) {
    return await MongodbAdapter.updateById(
      discountCouponSchema,
      discountCouponId,
      payload
    );
  }

  async findById(discountCouponId) {
    return await MongodbAdapter.findById(
      discountCouponSchema,
      discountCouponId
    );
  }

  async findAll() {
    return await MongodbAdapter.find(discountCouponSchema);
  }

  async findFilter(filter) {
    return await MongodbAdapter.findFilter(discountCouponSchema, filter);
  }

  async deleteById(discountCouponId) {
    return await MongodbAdapter.deleteById(
      discountCouponSchema,
      discountCouponId
    );
  }
}

module.exports = new DiscountCouponService();
