const productService = require('../services/productService');

class ProductController {
  async create(req, res) {
    const product = req.body;
    const createdProduct = await productService.create(product);
    return res.json(createdProduct);
  }

  async update(req, res) {
    const product = req.body;
    const updatedProduct = await productService.update(product.id, product);
    return res.json(updatedProduct);
  }

  async find(req, res) {
    const products = await productService.findAll();
    return res.json(products);
  }

  async findById(req, res) {
    const productId = req.params.id;
    const product = await productService.findById(productId);
    return res.json(product);
  }

  async delete(req, res) {
    const productId = req.params.id;
    const deleted = await productService.deleteById(productId);
    return res.json({ isDeleted: deleted });
  }
}

module.exports = new ProductController();
