const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors= require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes");
const cookieParser=require('cookie-parser');

const app=express();

app.use(
  cors({
    origin: ["http://localhost:5173",
      "https://blackcubemern.netlify.app/"
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('Express Running');
})
app.use('/api/auth',authRoutes);
app.use('/api/product',productRoutes);

const PORT = process.env.PORT || 5000;

const startServer=async()=>{
    await connectDB();

    app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});
};

startServer();

