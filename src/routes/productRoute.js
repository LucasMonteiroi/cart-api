const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', async (req, res) => productController.find(req, res));
router.get('/:id', async (req, res) => productController.findById(req, res));
router.post('/', async (req, res) => productController.create(req, res));
router.put('/:id', async (req, res) => productController.update(req, res));
router.delete('/:id', async (req, res) => productController.delete(req, res));

module.exports = router;
