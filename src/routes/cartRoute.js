const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', async (req, res) => cartController.find(req, res));
router.get('/:id', async (req, res) => cartController.findById(req, res));
router.post('/', async (req, res) => cartController.create(req, res));
router.put('/:id', async (req, res) => cartController.update(req, res));
router.delete('/:id', async (req, res) => cartController.delete(req, res));

module.exports = router;
