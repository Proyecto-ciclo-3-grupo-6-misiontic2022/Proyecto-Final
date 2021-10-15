const express=require('express');
const router=express.Router();

const   ArticuloController=require('../controllers/ArticuloController');
router.post('/add',ArticuloController.add);
router.put('/enabled',ArticuloController.enabled);
router.put('/disabled',ArticuloController.disabled);
router.put('/update',ArticuloController.update);
router.get('/list',ArticuloController.list);
router.delete('/remove',ArticuloController.remove);
module.exports=router;