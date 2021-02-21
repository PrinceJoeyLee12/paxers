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
    console.log(req.params.eventId);
    form = await Form.findOne({ eventId: req.params.eventId });
    console.log(form);
    res.json(form);
  } catch (err) {
    console.log(ere);
  }
});

module.exports = router;
