const models = require("../models");
const bcrypt = require("bcryptjs");
const cleanCadena=(value)=> {
  return value.normalize('NFD').replace(/[\u00C0-\u00FF]/g, '').toUpperCase();
 }
//publicos
module.exports = {
  add: async (req, res, next) => {
    try {
      console.log("request", req.body._id);
      let checkCategoria = await models.Categoria.findOne({
        nombre: req.body.nombre
        //categoria:{$ne:req.body._id}
      });
      if (!checkCategoria) {
        const reg = await models.Categoria.create(req.body);
        res.status(202).json(reg);
      } else {
        res.status(404).send({
          message: "La categoria ya existe",
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
    try {
      
      const reg = await models.Categoria.find({}).sort({ estado: 1 });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  listActive: async (req, res, next) => {
    try {
      
      const reg = await models.Categoria.find({estado:1}).sort({ estado: 1 });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  enabled: async (req, res, next) => {
    try {
      console.log("request", req.body._id);
      const reg = await models.Categoria.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 1 }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  disabled: async (req, res, next) => {
    try {
      console.log("request", req.body._id);
      const reg = await models.Categoria.findByIdAndUpdate(
        { _id: req.body._id },
        { estado: 0 }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
     
      //const auxReg = await models.Categoria.findOne({_id:req.body.id});
      //console.log("request1",req.body.nombre);
     // console.log("request2",auxReg.nombre);
      //if (! (cleanCadena(req.body.nombre) === cleanCadena(auxReg.nombre) )) {
        //const auxReg = await models.Categoria.findOne({nombre:req.body.nombre});
       // if(!auxReg){
        const reg = await models.Categoria.findByIdAndUpdate({_id:req.body._id},{
          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
        });
        res.status(200).json(reg);
     // } else {
      //  res.status(404).send({
       //   message: "La categoria ya existe",
       // });
      //}   
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  remove: async (req, res, next) => {
    try {
      console.log("request", req.body._id);
      const reg = await models.Categoria.findByIdAndDelete(
        { _id: req.body._id }
      );
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
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
