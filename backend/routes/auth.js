require('dotenv').config()
const express = require('express')
const User = require('../models/User')
const router = express.Router()
const {body , validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET=process.env.SECRET_KEY
const fetchuser = require('../middleware/fetchuser')
const mysql = require('mysql')


router.get('/mysql',(req,res)=>{
    try {
        const connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'car-rental'
        });
        connection.connect();
        connection.query('SELECT * FROM details', function (error, results, fields) {
            console.log('Results:', results);
            // If you want to iterate through the results and display each row
            res.json(results)
            // results.forEach((row, index) => {
            //   console.log(`Row ${index + 1}:`, row);
            // });
        });
 
        
    } catch (error) {
        res.json({error:error.message})
    }
})


router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid Email').isEmail(),
    body('password','Enter valid password').isLength({min:5}) 
], async (req,res)=>{
    // If there are erros, return bad request 
   const errors= validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }

   try {

    let user =  await User.findOne({email:req.body.email})

    if(user){
     return res.status(400).json({error:"sorry a user with same email already exists"})
    }
 
    const salt=await bcryptjs.genSalt(10)
    const secPass=await bcryptjs.hash(req.body.password,salt)
    user = await User.create({
     name:req.body.name,
     password:secPass,
     email:req.body.email,
    })
    // .then(user => res.json(user))
    // .catch((err)=>console.log(err))

    const data={
        user:{
            id:user.id
        }
    }
    
    const auth_token=jwt.sign(data,JWT_SECRET)
    // console.log(auth_token)
    res.json({auth_token})
    
   } catch (error) {
      console.error(error.message)
      res.status(500).send("Some error occured")
   }
  // res.json({"status":"Done successfully"})
})
router.post('/login',[
    body('email','Enter a valid Email').isEmail(),
    body('password','Password cannot be blank').exists() 
], async (req,res)=>{
   const errors= validationResult(req)
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
   }

   const {email,password}=req.body
   try {
    let user=await User.findOne({email:email});
    if(!user)
    {
        return res.status(400).json({error : "Try to login with correct credential"})
    }
    const passwordCompare=await bcryptjs.compare(password,user.password)
    if(!passwordCompare)
    {
        return res.status(400).json({error : "Try to login with correct credential"})
    }
    const data={
        user:{
            id:user.id
        },
        // exp:{
        //     exp_time:Math.floor(Date.now() / 1000) + 30 
        // }
    }
    //console.log(data)
    const auth_token=jwt.sign(data,JWT_SECRET)
    res.json({auth_token:auth_token,status:"Logged In"})
   } catch (error) {
    res.status(500).send({error : error.message})
   } 
})


router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        let  userId=req.user.id
        console.log(userId)
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        res.status(500).send({error : error.message})
    }

})



module.exports=router