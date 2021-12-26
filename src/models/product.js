const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: 'Name required',
  },
  description: {
    type: String,
  },
  barcode: {
    type: String,
    required: 'Barcode required',
  },
  value: {
    type: Number,
    required: 'Value required',
  },
});

module.exports = mongoose.model('Product', productSchema);
