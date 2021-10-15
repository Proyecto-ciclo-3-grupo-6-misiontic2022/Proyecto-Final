const express = require('express')
const mongoose =require('mongoose');
var morgan = require('morgan');
const cors = require("cors");
const app = express();
const apiRouter=require('./routes');
//const port = 3000

app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, ContentType, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
 });
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//mongodb local

mongoose.Promise=global.Promise;
//const urlDB='mongodb://localhost:27017/portafolio40'
const urlDB='mongodb+srv://andres:admin123@testfinal.v8gdl.mongodb.net/test_final?retryWrites=true&w=majority'

mongoose.connect(urlDB)
.then(mongoose=>console.log('Conectado en atlas'))
.catch(err=>console.log(err))

app.use('/api',apiRouter);
app.get('/', (req, res) => {
  res.status(200).send('Hello World!cccccccccccccc')
})

//app.listen(port, () => {
 // console.log(`Example app listening at http://localhost:${port}`)
//})

app.set('PORT',process.env.Port ||  '3000');
app.listen(app.get('PORT'), () => {
    console.log(`Example app listening at http://localhost:${app.get('PORT')}`)
  })