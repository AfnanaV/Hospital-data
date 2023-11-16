const express=require('express');
const morgan=require('morgan');
const fs=require('fs');

const app=new express();
const routeb=require('./routes/routes.js');

app.use(morgan('dev'));
require('dotenv').config();

const PORT=process.env.PORT;
app.use('/hospitalapp',routeb);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})