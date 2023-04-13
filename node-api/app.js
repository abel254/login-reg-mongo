const express = require("express");
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()
app.use(cors())
app.use(express.json());

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'dfhierojkjioheioihkhfari4459458038uituioreu?jjgkjk!-jfgj'

const mongoUrl = `mongodb+srv://${process.env.MONGO_URL_USERNAME}:${process.env.MONGO_URL_PASSWORD}@cluster0.hutlgx6.mongodb.net/codespace-db?retryWrites=true&w=majority`

const MONGO_URL = process.env.MONGO_U

mongoose.connect(mongoUrl, {
    useNewUrlParser: true
}).then(()=>{console.log('Connected to database')})
.catch(e=>console.log(e))

require('./userDetails')
const User = mongoose.model('UserInfo')

app.post('/register', async(req, res)=>{
  const {firstname, lastname, email, password} = req.body

  const encryptedPassword = await bcrypt.hash(password, 10)

  try {
    const oldUser = await User.findOne({email})
    if(oldUser){
      return res.send({error: 'User Exists'})
    }
    await User.create({
      firstname,
      lastname,
      email,
      password: encryptedPassword,
    })
    res.send({status: 'ok'})
  } catch (error) {
    res.send({status: 'error'})
  }
})

app.post('/login-user', async(req, res)=>{
  const {email, password} = req.body

  const user = await User.findOne({email})
  if(!user){
    return res.json({error:'User Not Found'})
  }
  if(await bcrypt.compare(password, user.password)){
    const token = jwt.sign({email:user.email}, JWT_SECRET, {
      expiresIn: 10,
    })

    if(res.status(201)){
      return res.json({status: 'ok', data: token})
    } else {
      return res.json({error: 'error'})
    }
  }
  res.json({status: 'error', error: 'Invalid Password'})
})

app.post('/userData', async(req, res)=>{
  const {token} = req.body
  try{
    const user = jwt.verify(token, JWT_SECRET, (err, res)=>{
      if(err) {
        return 'token expired'
      }
      return res
    })
    console.log(user);
    if(user === 'token expired'){
      return res.send({status:'error', data: 'token expired'})
    }

    const useremail = user.email
    User.findOne({email: useremail})
    .then((data)=>{
      res.send({status: 'ok', data: data})
    })
    .catch((error)=>{
      res.send({status: 'error', data: error})
    })
  } catch(error){

  }
})

app.listen(5000, () => {
  console.log("Server Started on port 5000");
});

// app.post("/post", async (req, res) => {
//   console.log(req.body);
//   const { data } = req.body;

//   try {
//     if (data == "abel") {
//       res.send({ status: "ok" });
//     } else {
//       res.send({ status: "User Not Found" });
//     }
//   } catch (error) {
//     res.send({ status: "Something went wrong try again" });
//   }
// });
