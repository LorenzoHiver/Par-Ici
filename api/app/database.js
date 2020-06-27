const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true,
        departureDate: 'departure_date',
        returnDate: 'return_date',
        daysNumber: 'days_number',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = sequelize;
