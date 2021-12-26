const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  store: {
    type: String,
  },
  products: [
    {
      quantity: Number,
      lineItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
  discountCoupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiscountCoupon',
  },
  total: {
    type: Number,
  },
  discountApplied: {
    type: Number,
  },
  subTotal: {
    type: Number,
  },
});

module.exports = mongoose.model('Cart', cartSchema);
