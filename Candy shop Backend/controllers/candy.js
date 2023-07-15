const Candy=require('../models/candy');


module.exports.getCandies=async (req,res,next)=>{
    try{
        const candies=await Candy.findAll();
        res.json(candies);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.getCandy=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const candy=await Candy.findByPk(id);
        if(!candy){
            return res.status(404).json({error:'Candy Not Found'});
            res.json(candy);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.postCandy=async (req,res,next)=>{
    try{
        const candyname=req.body.candyname;
        const description=req.body.description;
        const price=req.body.price;
        const quantity=req.body.quantity;

        const newCandy=await Candy.create({
            candyname:candyname,
            description:description,
            price:price,
            quantity:quantity
        });

        res.json(newCandy);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports.updateCandy=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const candy=await Candy.findByPk(id);
        if(!candy){
            return res.status(404).json({error:'Candy Not Found'});
        }
        const newquantity=req.query.newquantity;
        candy.quantity=newquantity;
        await candy.save();
        res.json(candy);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Server Error'});
    }
};