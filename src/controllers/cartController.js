const cartService = require('../services/cartService');
const { NotFoundError } = require('../utils/errors')

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

  async sumCart(req, res) {
    const cartId = req.params.id;
    let cart = await cartService.findById(cartId);
    
    if (!cart) throw new NotFoundError("Cart doesn't exists.")

    cart = await cartService.generateTotals(cart.document);
    return res.json(cart);
  }

  async addProduct(req, res) {
    const cartId = req.params.id;
    const product = req.body;
    const cart = await cartService.addOrUpdateProductToCart(cartId, product);
    return res.json(cart);
  }

  async removeProduct(req, res) {
    const { id: cartId, barcode: product } = req.params;
    const cart = await cartService.removerProductFromCart(cartId, product);
    return res.json(cart);
  }

  async addDiscountCoupon(req, res) {
    const cartId = req.params.id;
    const coupon = req.body;
    const cart = await cartService.applyDiscountCoupon(cartId, coupon);
    return res.json(cart);
  }

  async clearCart(req, res) {
    const cartId = req.params.id;
    const cart = await cartService.clearCart(cartId);
    return res.json(cart);
  }
}

module.exports = new CartController();
