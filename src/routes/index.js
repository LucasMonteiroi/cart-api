const express = require('express');
const productRoute = require('./productRoute');
const cartRoute = require('./cartRoute');
const discountCouponRoute = require('./discountCouponRoute');

const routes = express.Router();

routes.use('/products', productRoute);
routes.use('/carts', cartRoute);
routes.use('/discountCoupons', discountCouponRoute);

module.exports = routes;
