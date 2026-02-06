const express = require('express');
const router = express.Router();
const Vacation = require('../models/Vacation');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/vacations
// @desc    Get all vacations (filtered by role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === 'employee') {
      filter = { employee: req.user.id };
    } else if (req.user.role === 'manager') {
      const subordinates = await User.find({ manager: req.user.id });
      const subordinateIds = subordinates.map(sub => sub._id);
      filter = { employee: { $in: [...subordinateIds, req.user.id] } };
    }
    const vacations = await Vacation.find(filter)
      .populate('employee', 'firstName lastName email department')
      .populate('approvedBy', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(vacations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/vacations
// @desc    Create vacation request
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { startDate, endDate, days, type, reason } = req.body;
    const vacation = new Vacation({
      employee: req.user.id,
      startDate,
      endDate,
      days,
      type,
      reason
    });
    await vacation.save();
    res.json(vacation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/vacations/:id/approve
// @desc    Approve vacation request
// @access  Private (Manager/HR/Admin only)
router.put('/:id/approve', auth, async (req, res) => {
  try {
    if (!['manager', 'hr', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const vacation = await Vacation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        approvedBy: req.user.id,
        approvalDate: Date.now()
      },
      { new: true }
    );
    res.json(vacation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/vacations/:id/reject
// @desc    Reject vacation request
// @access  Private (Manager/HR/Admin only)
router.put('/:id/reject', auth, async (req, res) => {
  try {
    if (!['manager', 'hr', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const vacation = await Vacation.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        approvedBy: req.user.id,
        approvalDate: Date.now(),
        rejectionReason: req.body.reason
      },
      { new: true }
    );
    res.json(vacation);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
