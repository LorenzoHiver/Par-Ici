const Duration = require('../models/duration');

const durationController = {

  getAllDuration: async (req, res) => {
    try {
      const durations = await Duration.findAll({
        include: ['review']
      });
      res.json(durations);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },

  getOneDuration: async (req, res) => {
    try {
      const durationId = req.params.id;
      const duration = await Duration.findByPk(durationId);
      if (duration) {
        res.json(duration);
      } else {
        res.status(404).send('Cant find duration with id ' + durationId);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = durationController;