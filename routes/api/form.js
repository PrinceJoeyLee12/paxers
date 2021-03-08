const express = require('express');
const router = express.Router();
const Form = require('../../models/Form');

//middleware
const checkObjectId = require('../../middleware/checkObjectId');

// @route      GET api/form/:eventId
// @desc       get form for event
// @access     private
router.get('/:eventId', checkObjectId('eventId'), async (req, res) => {
  try {
    form = await Form.findOne({ eventId: req.params.eventId });
    res.json(form);
  } catch (err) {
    res.status(500).json({ msg: "There's an error on our side" });
  }
});

module.exports = router;
