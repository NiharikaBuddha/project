const express=require('express');
const candyController=require('../controllers/candy');

const router=express.Router();

router.get('/',candyController.getCandies);
router.get('/:id',candyController.getCandy);
router.post('/',candyController.postCandy);
router.patch('/:id',candyController.updateCandy);

module.exports=router;