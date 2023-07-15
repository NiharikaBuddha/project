const Sequelize=require('sequelize');

const sequelize=new Sequelize('candyshop','root','Vijay#2000',{
    dialect:'mysql',
    host:'localhost'
})

async function testConnection(){
    try{
        await sequelize.authenticate();
        console.log("Database Connection is successful");
    }catch(err){
        console.log(err);
    }
}

testConnection();

module.exports=sequelize;