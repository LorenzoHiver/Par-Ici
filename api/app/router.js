var express = require('express');

// Import des controllers
const durationController = require('./controllers/durationController');
const reviewController = require('./controllers/reviewController');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json('API OK !');
});

/* Duration */
router.get('/durations', durationController.getAllDuration);
router.get('/duration/:id', durationController.getOneDuration);

/* Review */
router.get('/duration/:id/review', reviewController.getReviewInDuration);

/* 404 */
router.use((req, res) => {
  res.status(404).send('Service does not exists\nSee : https://doc.localhost.api');
});

module.exports = router;
