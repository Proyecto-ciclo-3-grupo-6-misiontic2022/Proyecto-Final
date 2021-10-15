const mongoose =require('mongoose');
const {Schema}=mongoose;



const ArticuloSchema=new Schema({
    categoria:{
        type:Schema.ObjectId,
        ref:'categoria'
    },
    codigo:{
        type:String,
        required:true,
        maxlength:25,
        unique:true
    },
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

const Articulo=mongoose.model('articulo',ArticuloSchema);

module.exports=Articulo;