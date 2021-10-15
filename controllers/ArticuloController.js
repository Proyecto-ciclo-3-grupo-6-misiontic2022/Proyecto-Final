const models = require("../models");
//publicos
module.exports = {
  
  add: async (req, res, next) => {
    try {
          
        
        const reg=await models.Articulo.create(req.body);
        res.status(202).json(reg);
      
    } catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }
  },
  list: async (req, res, next) => {
    try{

      const reg=await models.Articulo.find({})
      .populate('categoria',{
        nombre: 1, 
        descripcion: 1
    })
    .sort({
        'codigo':1
    });
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
      const reg=await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:1});
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
      const reg=await models.Articulo.findByIdAndUpdate({_id:req.body._id},{estado:0});
      res.status(200).json(reg);
    }catch (error) {
      res.status(500).send({
        message: "Ocurrio un error",
      });
      next(error);
    }

  },
  remove: async (req,res,next) => {
    try {
        const reg = await models.Articulo.findByIdAndDelete({_id:req.body._id});
        res.status(200).json(reg);
    } catch(e){
        res.status(500).send({
            message:'Ocurrió un error'
        });
        next(e);
    }
},
  update: async (req, res, next) => {
    try {
      const reg = await models.Articulo.findByIdAndUpdate({_id:req.body._id},{
        nombre: req.body.nombre,         
        codigo: req.body.codigo, 
        categoria:req.body.categoria, 
        descripcion: req.body.descripcion});
      res.status(200).json(reg);
  } catch(e){
      res.status(500).send({
          message:'Ocurrió un error'
      });
      next(e);
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