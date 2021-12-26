const MongodbAdapter = require('../adapters/mongodbAdapter');
const productSchema = require('../models/product');

class ProductService {
  async create(product) {
    return await MongodbAdapter.create(productSchema, product);
  }

  async update(productId, payload) {
    return await MongodbAdapter.updateById(productSchema, productId, payload);
  }

  async findById(productId) {
    return await MongodbAdapter.findById(productSchema, productId);
  }

  async findAll() {
    return await MongodbAdapter.find(productSchema);
  }

  async findFilter(filter) {
    return await MongodbAdapter.findFilter(productSchema, filter);
  }

  async deleteById(productId) {
    return await MongodbAdapter.deleteById(productSchema, productId);
  }
}

module.exports = new ProductService();
