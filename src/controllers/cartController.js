const cartService = require('../services/cartService');

class CartController {
  async create(req, res) {
    const cart = req.body;
    const createdCart = await cartService.create(cart);
    return res.json(createdCart);
  }

  async update(req, res) {
    const cart = req.body;
    const updatedCart = await cartService.update(cart.id, cart);
    return res.json(updatedCart);
  }

  async find(req, res) {
    const carts = await cartService.findAll();
    return res.json(carts);
  }

  async findById(req, res) {
    const cartId = req.params.id;
    const cart = await cartService.findById(cartId);
    return res.json(cart);
  }

  async delete(req, res) {
    const cartId = req.params.id;
    const deleted = await cartService.deleteById(cartId);
    return res.json({ isDeleted: deleted });
  }
}

module.exports = new CartController();
