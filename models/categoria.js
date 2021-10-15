const mongoose =require('mongoose');
const {Schema}=mongoose;



const CategoriaSchema=new Schema({
nombre:{
    type:String,
    required:true,
    maxlength:100,
    unique:true
},
descripcion:{
    type:String,
    required:true,
    maxlength:500,
},

estado:{
    type:Number,
    default:1
},
createdAT:{
    type:Date,
    default:Date.now
}
})

const Categoria=mongoose.model('categoria',CategoriaSchema);

module.exports=Categoria;