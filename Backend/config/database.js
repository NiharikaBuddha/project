// const Sequelize=require('sequelize');

// const sequelize=new Sequelize('node-complete','root','Vijay#2000',{
//     dialect:'mysql',
//     host:'localhost'
// });

// module.exports=sequelize;
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task-19', 'root', 'Vijay#2000', {
  host: 'localhost',
  dialect: 'mysql',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports=sequelize;