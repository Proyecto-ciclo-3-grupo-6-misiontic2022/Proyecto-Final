const express=require('express');
const router=express.Router();
const auth = require('../middlewares/auth')
const   UsuarioController=require('../controllers/UsuarioController');
router.post('/add',UsuarioController.add);
router.post('/login',UsuarioController.login);
router.put('/enabled',auth.verificarAdministrador,UsuarioController.enabled);
router.put('/disabled',auth.verificarAdministrador,UsuarioController.disabled);

router.get('/list',UsuarioController.list);
module.exports=router;