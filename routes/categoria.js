const express=require('express');
const router=express.Router();

const   CategoriaController=require('../controllers/CategoriaController');
router.post('/add',CategoriaController.add);
router.put('/enabled',CategoriaController.enabled);
router.put('/disabled',CategoriaController.disabled);
router.put('/update',CategoriaController.update);
router.get('/list',CategoriaController.list);
router.delete('/remove',CategoriaController.remove);
router.get('/listActive',CategoriaController.listActive);
module.exports=router;