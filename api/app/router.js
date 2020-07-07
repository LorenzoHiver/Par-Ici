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
router.route('/durations')
  .get(durationController.getAllDuration)
  .post(durationController.createDuration);
router.route('/duration/:id')
  .get(durationController.getOneDuration)
  .patch(durationController.modifyDuration)
  .delete(durationController.deleteDuration);

/* Review */
router.route('/duration/:id/review')
  .get(reviewController.getReviewInDuration)
  .post(reviewController.createReviewToDuration);
router.route('/review/:id')
  .get(reviewController.getOneReview)
  .delete(reviewController.deleteReview);

/* 404 */
router.use((req, res) => {
  res.status(404).send('Service does not exists\nSee : https://doc.localhost.api');
});

module.exports = router;
