const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const userRoute=require('./routes/userRoutes');
const carRoute=require('./routes/carRoutes');
app.use(cors({
  origin:'*'
}))

dotenv.config();
app.use(bodyParser.json());
connectDB();
app.get('/',(req,res)=>{
  res.send('hello atul');
})
app.use('/api/user',userRoute);
app.use('/api/car',carRoute);

app.listen(3000,()=>{
  console.log('server is started');
})