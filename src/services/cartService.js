/* eslint-disable no-param-reassign */
const MongodbAdapter = require('../adapters/mongodbAdapter');
const cartSchema = require('../models/cart');
const productService = require('./productService');
const discountCouponService = require('./discountCouponService');
const { NotFoundError, UnprocessableEntityError } = require('../utils/errors')

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
      throw new UnprocessableEntityError('Products is required');
    }

    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new NotFoundError('Cart is invalid, please enter a valid cart');
    }

    const result = await productService.findFilter({
      barcode: product.barcode,
    });

    if (!result || !result.length) {
      throw new NotFoundError(`Products doesn't exists`);
    }

    const existsProduct = storedCart.document.products.find(
      (item) => item.barcode === product.barcode
    );

    if (!existsProduct) {
      product.value = result[0].document.value;
      storedCart.document.products.push(product);
    } else {
      existsProduct.quantity = product.quantity;
      existsProduct.value = result[0].document.value;
    }

    const updatedCart = await this.update(cart, storedCart.document);

    return updatedCart;
  }

  async removerProductFromCart(cart, product) {
    if (!product) {
      throw new Error('Products is required');
    }

    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new NotFoundError('Cart is invalid, please enter a valid cart');
    }

    const existsProduct = storedCart.document.products.find(
      (item) => item.barcode === product
    );

    if (!existsProduct) {
      throw new NotFoundError(`Products doesn't exists`);
    }

    const productIndex = storedCart.document.products.indexOf(existsProduct);
    if (productIndex > -1) {
      storedCart.document.products.splice(productIndex, 1);
    }

    const updatedCart = await this.update(cart, storedCart.document);
    return updatedCart;
  }

  async applyDiscountCoupon(cart, coupon) {
    if (!coupon) {
      throw new UnprocessableEntityError('Discount Coupon is required');
    }

    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new NotFoundError('Cart is invalid, please enter a valid cart');
    }

    const result = await discountCouponService.findFilter({ tag: coupon.tag });

    if (!result || !result.length) {
      throw new NotFoundError(`Discount Coupon doesn't exists`);
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

      if (!coupon || !coupon.length) throw new NotFoundError("coupon doesn't exists.")

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

  async clearCart(cart) {
    const storedCart = await this.findById(cart);

    if (!storedCart) {
      throw new NotFoundError('Cart is invalid, please enter a valid cart');
    }

    storedCart.document.total = 0;
    storedCart.document.subtotal = 0;
    storedCart.document.discountApplied = 0;
    storedCart.document.discountCoupon = '';
    storedCart.document.products = [];

    const updatedCart = await this.update(cart, storedCart.document);
    return updatedCart;
  }
}

module.exports = new CartService();
