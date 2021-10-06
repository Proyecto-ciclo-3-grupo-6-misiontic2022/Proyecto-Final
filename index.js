const express = require('express')
var morgan = require('morgan')
var cors=require('cors')
const app = express()
//const port = 3000

app.use(morgan('dev'));
app.use(cors());

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