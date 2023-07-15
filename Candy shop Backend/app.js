const express=require('express');
const sequelize=require('./database');
const cors=require('cors');

const candyRoutes=require('./routes/candies');

const app=express();

app.use(cors);
app.use(express.json());

app.use('/candies',candyRoutes);


sequelize.sync()
.then((result)=>{
    console.log("Database created successfully!");
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

