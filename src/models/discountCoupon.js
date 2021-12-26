const mongoose = require('mongoose');

const { Schema } = mongoose;

const discountCouponSchema = new Schema({
  tag: {
    type: String,
    required: 'Tag required',
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: 'Amount required',
  },
  isPercentage: {
    type: Boolean,
    required: 'Is Percentage required',
  },
});

module.exports = mongoose.model('DiscountCoupon', discountCouponSchema);
