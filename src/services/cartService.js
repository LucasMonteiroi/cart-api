const MongodbAdapter = require('../adapters/mongodbAdapter');
const cartSchema = require('../models/cart');

class CartService {
  async create(cart) {
    return await MongodbAdapter.create(cartSchema, cart);
  }

  async update(cartId, payload) {
    return await MongodbAdapter.updateById(cartSchema, cartId, payload);
  }

  async findById(cartId) {
    return await MongodbAdapter.findById(cartSchema, cartId);
  }

  async findAll() {
    return await MongodbAdapter.find(cartSchema);
  }

  async findFilter(filter) {
    return await MongodbAdapter.findFilter(cartSchema, filter);
  }

  async deleteById(cartId) {
    return await MongodbAdapter.deleteById(cartSchema, cartId);
  }
}

module.exports = new CartService();
