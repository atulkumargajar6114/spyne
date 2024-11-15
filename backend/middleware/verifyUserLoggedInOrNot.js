const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const verifyUserLoggedInOrNot=(req,res,next)=>{
  try {
    const token=req.headers.authorization;
    if(!token){
      return res.status(401).send('Access Denied');
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.userId=decode.userId;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
}
module.exports=verifyUserLoggedInOrNot;