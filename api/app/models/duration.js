const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Duration extends Model {};

Duration.init({
  departureDate: DataTypes.DATE,
  returnDate: DataTypes.DATE,
  daysNumber: DataTypes.INTEGER,
  firstname: DataTypes.TEXT,
  lastname: DataTypes.TEXT,
  phone: DataTypes.CHAR,
  code: DataTypes.CHAR
}, {
  sequelize,
  tableName: "duration"
});

module.exports = Duration;
