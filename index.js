const express = require("express");
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require("./routes/product.route.js");
const app = express();
const port = 8000;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api/products', productRoute)



app.get('/', (req, res)=>{
     res.send("Welcome to the server!");
});
//show all products

//show products by ID


//create product


//update product


//delete product


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



