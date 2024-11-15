const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectDB=async ()=>{
  await mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log('DB Connected');
  }).catch((error)=>{
    console.log(error);
  })
}

module.exports=connectDB;