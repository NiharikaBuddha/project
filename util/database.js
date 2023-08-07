// const Sequelize = require('sequelize');

// const sequelize = new Sequelize('sakila', 'root', '10509037@Niha', {
//   dialect: 'mysql',
//   host: 'localhost'
// });

// module.exports = sequelize;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sakila', 'root', '10509037@Niha', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
