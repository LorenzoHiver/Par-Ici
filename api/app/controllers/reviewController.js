const { Duration, Review } = require('../models');

const reviewController = {

  getReviewInDuration: async (req, res) => {
    try {
      // On identifie la période
      const durationId = req.params.id;
      const duration = await Duration.findByPk(durationId, {
        // On inclue l'avis à celle-ci
        include: ['review']
      });

      if (!duration) {
        res.status(404).json(`Aucune période de l'id ${durationId} n'a été trouvée`);
      } else {
        // Puis on donne à la vue, l'avis qui est attaché à la période
        res.json(duration.review);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  getOneReview: async (req, res) => {
    try {
      // On identifie un avis par son id
      const reviewId = req.params.id;
      const review = await Review.findByPk(reviewId, {
        // On y inclu sa période pour récupérer ses infos si nécessaire
        include: 'duration'
      });
      if (!review) {
        res.status(404).json(`Aucun avis de l'id ${reviewId} n'a été trouvé`);
      } else {
        // 
        res.json(review);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createReviewToDuration: async (req, res) => {
    try {
      // On cible la période concernée
      const durationId = req.params.id;
      const duration = await Duration.findByPk(durationId);

      if (!duration) {
        res.status(404).json(`Aucune période de l'id ${durationId} n'a été trouvée`);
      }

      // on stocke l'id de la période dans une variable propre à l'avis
      const duration_id = durationId;

      // Le code de la période, nécessaire pour pouvoir poster l'avis sur celle-ci
      const code = duration.code;

      // On permet à ces variables d'être modifiée
      const { comment, rating, picture } = req.body;

      // On permet aux valeurs firstname et lastname d'être modifiée et ont par défaut la même valeur que celle liée à la période
      if (req.body.firstname) {
        firstname = req.body.firstname;
      } else {
        firstname = duration.firstname;
      };
      if (req.body.lastname) {
        lastname = req.body.lastname;
      } else {
        lastname = duration.lastname;
      };

      let bodyErrors = [];
      if (!firstname) {
        bodyErrors.push("Vous devez indiquer un prénom");
      }
      if (!lastname) {
        bodyErrors.push("Vous devez indiquer un nom");
      }
      if (!rating) {
        bodyErrors.push("L'avis doit posséder une note entre 1 et 5 inclus");
      }
      if (!duration_id) {
        bodyErrors.push("L'avis doit être lié à une période");
      }
      if (bodyErrors.length) {
        res.status(400).json(bodyErrors);

      } else {
        let newReview = Review.build({
          firstname,
          lastname,
          picture,
          comment,
          rating,
          code,
          duration_id
        });

        await newReview.save();
        res.json(newReview);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
    
  },

  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.id;
      let review = await Review.findByPk(reviewId);
      if (!review) {
        res.status(404).json(`Aucun avis de l'id ${reviewId} n'a été trouvé`);
      } else {
        await review.destroy();
        res.json(`L'avis de l'id ${reviewId} a bien été supprimé`);
      }

    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  }
}

module.exports = reviewController;