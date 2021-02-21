const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');

// middleware
const { headerCheckTokenMiddleware } = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');

// @route    GET api/event/all
// @desc     get all event's title
// @access   Public
router.get('/all', async (req, res) => {
  try {
    events = await Event.find({}, 'title').select('-_id');
    return res.json(events);
  } catch (err) {
    return res
      .status(500)
      .send("We're sorry there's something wrong in our side");
  }
});

// @route    GET api/event/like/:eventID
// @desc     like or dislike a post
// @access   Private
router.put(
  '/like/:id',
  [headerCheckTokenMiddleware, checkObjectId('id')],
  async (req, res) => {
    const { avatar } = req.body;

    try {
      const event = await Event.findById(req.params.id);

      // check if the event is already been like by the user
      if (event.likes.some(like => like._id.toString() === req.user.id)) {
        event.likes = event.likes.filter(({ _id }) =>
          _id === undefined ? '' : _id.toString() !== req.user.id,
        );
      } else {
        event.likes.unshift({ _id: req.user.id, avatar });
        console.log(event.likes);
      }

      await event.save((err, event) => {
        if (err) return res.json({ msg: 'Error on updating likes' });
        res.json(event.likes);
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send("We're sorry there's something wrong in our side");
    }
  },
);

// @route    GET api/events/
// @desc     get 10 events recently added
// @access   Public
router.get('/', async (req, res) => {
  const events = await Event.find().sort({ date: -1 }).limit(10);
  console.log(events);
  res.json(events);
});

// @route    GET api/event/:id
// @desc     get 10 events recently added
// @access   Public
router.get('/:id', async (req, res) => {
  const events = await Event.findById(req.params.id);
  console.log(events);
  res.json(events);
});

// @route    POST api/event/get-event/:title
// @desc     get searched event by title
// @access   Public
router.post('/get-event/:title', async (req, res) => {
  const event = await Event.findOne({ title: req.params.title });
  console.log(event);
  res.json(event);
});

module.exports = router;
