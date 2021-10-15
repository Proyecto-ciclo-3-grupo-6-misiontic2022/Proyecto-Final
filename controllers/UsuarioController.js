const models = require("../models");
const  bcrypt = require('bcryptjs');
const token=require('../services/token');
//publicos
module.exports = {
  
  add: async (req, res, next) => {
    try {
      let checkUser = await models.Usuario.findOne({
        correo: req.body.correo,
      });
      if (!checkUser) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const reg=await models.Usuario.create(req.body);
        res.status(202).json(reg);

      } else {
        res.status(404).send({
          message: "El usuario ya existe",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try{

      const reg=await models.Usuario.find({}).sort({'rol':1});
      res.status(200).json(reg);
    }catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }

  },
  enabled: async (req, res, next) => {
    try{
      console.log("request",req.body._id);
      const reg=await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:1});
      res.status(200).json(reg);
    }catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }

  },
  disabled: async (req, res, next) => {
    try{
      console.log("request",req.body._id);
      const reg=await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
      res.status(200).json(reg);
    }catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }

  },
  update: async (req, res, next) => {
    try{
let auxPassword= req.body.password;
      let auxReg = await models.Usuario.findOne({
        correo: req.body.correo,
      });
if(auxReg){
  if(auxPassword!==auxReg.password){
    console.log("request",req.body.password);
    req.body.password = await bcrypt.hash(req.body.password, 10);   
    console.log("request",req.body.password);
  }
  const reg=await models.Usuario.updateOne({correo:req.body.correo},{
    nombre:req.body.nombre,
    rol:req.body.rol,
    password:req.body.password
    });
    res.status(200).json(reg);
}else{
  res.status(404).send({
    message: "El usuario no registrado",
  });
}

      console.log("request",req.body._id);
      const reg=await models.Usuario.findByIdAndUpdate({_id:req.body._id},{estado:0});
      res.status(200).json(reg);
    }catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }

  },
  login: async (req, res, next) => {
    try {
        let checkUser = await models.Usuario.findOne({
          correo: req.body.correo,
          estado:1
        });
        if (checkUser) {
          //console.log("request",req.body.password);
         // console.log("database",checkUser.password);
          let match=await bcrypt.compare(req.body.password, checkUser.password);
          if(match){
            let tokenReturn=await token.encode(checkUser);
            res.status(200).json({
                checkUser,
                tokenReturn
              })
          }else{
            res.status(401).send({
                message: 'Contraseña incorrecta',
              });
          }


        //  req.body.password = await bcrypt.hash(req.body.password, 10);
         //const reg=await models.Usuario.create(req.body);
         // res.status(202).json(reg);
  
        } else {
          res.status(404).send({
            message: 'El usuario no registrado',
          });
        }
      } catch (error) {
        res.status(500).send({
          message: 'Ocurrio un error',

        });
        next(error);
      }


    
  },
};

//login(){
//axios.post('localhost:3000/api/usuario/login',{
//correo:this.correo,
//password:this.password
//})
//.then(console.log('exito'))
//.catch(console.log('error'))
//}