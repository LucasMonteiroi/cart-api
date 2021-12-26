/* eslint-disable no-param-reassign */
const MongodbAdapter = require('../adapters/mongodbAdapter');
const cartSchema = require('../models/cart');
const productService = require('./productService');
const discountCouponService = require('./discountCouponService');

class CartService {
  async create(cart) {
    cart.total = 0;
    cart.subtotal = 0;
    cart.discountApplied = 0;
    return await MongodbAdapter.create(cartSchema, cart);
  }

  async update(cartId, payload) {
    const updatedCart = await MongodbAdapter.updateById(
      cartSchema,
      cartId,
      payload
    );
    await this.generateTotals(updatedCart.document);
    return updatedCart;
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

  async addOrUpdateProductToCart(cart, product) {
    if (!product) {
      throw new Error('Products is required');
    }

    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new Error('Cart is invalid, please enter a valid cart');
    }

    const result = await productService.findFilter({
      barcode: product.barcode,
    });

    if (!result) {
      throw new Error(`Products doesn't exists`);
    }

    const existsProduct = storedCart.document.products.find(
      (item) => item.barcode === product.barcode
    );

    if (!existsProduct) {
      storedCart.document.products.push(product);
    }

    existsProduct.quantity = product.quantity;

    const updatedCart = await this.update(cart, storedCart.document);

    return updatedCart;
  }

  async applyDiscountCoupon(cart, coupon) {
    if (!coupon) {
      throw new Error('Discount Coupon is required');
    }

    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new Error('Cart is invalid, please enter a valid cart');
    }

    const result = await discountCouponService.findFilter({ tag: coupon.tag });

    if (!result) {
      throw new Error(`Discount Coupon doesn't exists`);
    }

    storedCart.document.discountCoupon = coupon.tag;

    await this.generateTotals(storedCart.document, result[0].document);

    const updatedCart = await this.update(cart, storedCart.document);

    return updatedCart;
  }

  async generateTotals(cart, coupon = null) {
    cart.total = 0;
    cart.subtotal = 0;
    cart.discountApplied = 0;

    if (cart.products) {
      cart.products.forEach((item) => {
        const productTotal = item.value * item.quantity;
        cart.total += productTotal;
      });
    }

    if (!coupon && cart.discountCoupon) {
      coupon = await discountCouponService.findFilter({
        tag: cart.discountCoupon,
      });

      coupon = coupon[0].document;
    }

    if (coupon) {
      if (coupon.isPercentage) {
        cart.discountApplied = (cart.total / 100) * coupon.amount;
      } else {
        cart.discountApplied = coupon.amount;
      }
    }

    if (cart.discountApplied > 0) {
      cart.subtotal = cart.total - cart.discountApplied;
    }

    return cart;
  }
}

module.exports = new CartService();
