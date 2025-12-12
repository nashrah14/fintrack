const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Transaction = require('../models/Transaction');

router.post(
  '/',
  auth,
  [
    body('title').notEmpty(),
    body('amount').isNumeric(),
    body('type').isIn(['income', 'expense']),
    body('category').notEmpty(),
    body('date').optional().isISO8601()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const transaction = new Transaction({
        user: req.user.id,
        ...req.body
      });
      await transaction.save();
      res.json(transaction);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const { q, type, category, from, to } = req.query;
    const filter = { user: req.user.id };

    if (q) filter.title = { $regex: q, $options: 'i' };
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (from || to) filter.date = {};

    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Not found' });

    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ msg: 'Not found' });

    if (transaction.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    await transaction.remove();
    res.json({ msg: 'Transaction removed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
