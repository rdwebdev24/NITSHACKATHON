// configuring the dotenv
require('dotenv').config();
// importing reqiired module
const express = require('express')
const cors = require('cors');
const connectdb = require('./config/db')
const bodyParser = require('body-parser')
const UserRouter =  require('./Routes/Route.js')
// importing controllers
const {GET_ALL_USER} = require('./controllers/Controller.js')
const {LOGIN,REGISTER} = require('./controllers/authControllers')

const PORT = process.env.PORT
// connecting the database
connectdb();
// creating app instance
const app = express();
// using cors for cross origin resource sharing 
app.use(cors());
// to parse json data from client 
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}))

app.use('/api',UserRouter)
app.get('/',(req,res)=>{res.send({msg:"success",status:200})})

app.listen(PORT,()=>{
     console.log(`server is listening on ${PORT}`);
})