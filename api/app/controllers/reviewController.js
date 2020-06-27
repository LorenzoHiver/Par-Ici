const { Duration } = require('../models');

const reviewController = {
  getReviewInDuration: async (req, res) => {
    try {
      const durationId = req.params.id;
      const duration = await Duration.findByPk(durationId, {
        include: ['review']
      });

      if (!duration) {
        res.status(404).json('Cant find duration with id ' + durationId);
      } else {
        res.json(duration.review);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  }
}

module.exports = reviewController;