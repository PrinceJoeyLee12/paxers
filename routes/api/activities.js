const express = require('express');
const router = express.Router();
const Activity = require('../../models/Activity');
const User = require('../../models/User');
const Registrant = require('../../models/Registrant');

//middleware
const checkObjectId = require('../../middleware/checkObjectId');
const { headerCheckTokenMiddleware } = require('../../middleware/auth');

// @route      GET api/activity/:userId
// @desc       get the 10 recent activities of the user
// @access     private
router.get(
  '/recent/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    try {
      const activity = await Activity.find({ userId: req.params.userId })
        .sort({ date: -1 })
        .limit(10);

      res.json(activity);
    } catch (err) {
      res.json({ msg: `Something went wrong` });
    }
  },
);

// @route      GET api/activity/:activityId
// @desc       get activity by id
// @access     private
router.get(
  '/:activityId',
  [headerCheckTokenMiddleware, checkObjectId('activityId')],
  async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);

      res.json(activity);
    } catch (err) {
      res.json({ msg: `Something went wrong` });
    }
  },
);

// @route      GET api/user/upcoming-activities/:userId
// @desc       Get upcoming activities
// @access     private
router.get(
  '/upcoming-activities/:userId',
  [headerCheckTokenMiddleware, checkObjectId('userId')],
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      if (!user) return res.status(400).json({ msg: 'User not found' });

      const upcomingActivities = await Registrant.find({
        userId: user._id,
      })
        .populate('event', [
          'endDate',
          'title',
          'distanceTypeIsKM',
          'startDate',
        ])
        .sort({ dateRegistered: -1 });
      res.json(upcomingActivities);
    } catch (err) {
      res.json({ msg: `Error on updating settings` });
    }
  },
);

module.exports = router;
