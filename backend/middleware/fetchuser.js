require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET=process.env.SECRET_KEY
const fetchuser=(req,res,next)=>{
    // Get the user from the jwt token
    const token=req.headers.authorization.split(' ')[1];
    if(!token)
    {
        res.status(401).send({error :"Please authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({error :error.message})
    }
}
module.exports=fetchuser