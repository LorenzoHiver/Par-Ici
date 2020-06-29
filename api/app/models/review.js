const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Review extends Model {};

Review.init({
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  picture: DataTypes.TEXT,
  comment: DataTypes.CHAR,
  rating: DataTypes.INTEGER
}, {
  sequelize,
  tableName: "review"
});

module.exports = Review;
