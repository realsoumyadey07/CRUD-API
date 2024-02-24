const express = require("express");
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();
const port = 8000;


//middleware
app.use(express.json());


app.get('/', (req, res)=>{
     res.send("Welcome to the server!");
})
app.post('/api/products', async(req, res)=>{
     try{
          const product = await Product.create(req.body);
          res.status(200).json(product);
     } catch(error){
         res.status(500).json({message: error.message}); 
     }
})

//database connection
//mongoDB project's password
//JVR6AGGbzrGXR3Ge
mongoose.connect('mongodb+srv://soumyadipdey:JVR6AGGbzrGXR3Ge@backend.vivco5h.mongodb.net/curd-api?retryWrites=true&w=majority&appName=backend')
.then(()=>{
     console.log("Connected to database!");
     app.listen(port, ()=>{
          console.log("Server is running");
     })
})
.catch(err=>{
     console.log(err);
})



