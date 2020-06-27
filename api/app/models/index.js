const Duration = require('./duration');
const Review = require('./review');

/** Associations */

Duration.hasOne(Review, {
    as: 'review',
    foreignKey: 'duration_id'
});

Review.belongsTo(Duration, {
    as: 'duration',
    foreignKey: 'duration_id'
});

module.exports = { Duration, Review };