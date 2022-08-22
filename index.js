import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

mongoose.connect(
    'mongodb://localhost:27017/blog')
    .then(()=>{console.log('DB ok!')})
    .catch((err)=>{console.log('DB error',err)})

const app = express();

app.use(express.json())

app.get('/', (req,res)=>{
    res.send('Hello world!');
});

app.post('/auth/login', (req,res)=>{
    console.log(req.body)

    const token = jwt.sign({
        email:req.body.email,
        fullName: 'DODI'
    }, 'body1233')

    res.json({
        "success":true,
        token
    })
})

app.listen(4444, (e)=>{
    if(e){
        console.log(e)
    }
    console.log('Server OK!')
})