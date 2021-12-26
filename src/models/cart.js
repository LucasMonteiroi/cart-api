const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
  store: {
    type: String,
  },
  products: [
    {
      quantity: Number,
      barcode: { type: String },
      value: Number,
    },
  ],
  discountCoupon: {
    type: String,
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
