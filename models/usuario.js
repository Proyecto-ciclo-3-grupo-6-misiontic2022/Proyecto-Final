const mongoose =require('mongoose');
const {Schema}=mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UsuarioSchema=new Schema({
nombre:{
    type:String,
    required:true,
    maxlength:100
},
correo:{
    type:String,
    required:true,
    maxlength:100,
    unique:true,
    lowercase:true,
    trinm:true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
},
password:{
    type:String,
    required:true,
    maxlength:100,
},
rol:{
    type:String,
    required:true,
    maxlength:25,
    enum:['Administrador','Gestor','Vendedor']
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

const Usuario=mongoose.model('usuario',UsuarioSchema);

module.exports=Usuario;