const express = require("express");
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();
const port = 8000;


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
     res.send("Welcome to the server!");
});
//show all products
app.get('/api/products', async (req, res)=>{
     try {
          const products = await Product.find({});
          res.status(200).json(products);
     } catch (error) {
          res.status(500).json({ message: error.message})
     }
});

//show products by ID
app.get('/api/products/:id', async (req, res)=>{
     try {
          const { id } = req.params;
          const product = await Product.findById(id);
          res.status(200).json(product);
     } catch (error) {
          res.status(500).json({message: error.message});
     }
});

//create product
app.post('/api/products', async(req, res)=>{
     try{
          const product = await Product.create(req.body);
          res.status(200).json(product);
     } catch(error){
         res.status(500).json({message: error.message}); 
     }
});

//update product
app.put('/api/product/:id', async (req, res)=>{
     try {
          const {id} = req.params;
          const product = await Product.findByIdAndUpdate(id, req.body);
          if(!product){
               return res.status(404).json({message: "Product not found"});
          }
          const updatedProduct = await Product.findById(id);
          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({message: error.message})
     }
});

//delete product
app.delete('/api/product/:id', async (req, res)=>{
     try {
          const {id} = req.params;
          const product = await Product.findByIdAndDelete(id);
          if(!product){
               return res.status(404).json({message: "Product not found"});
          }
          res.status(200).json({message: "Product deleted successfully"});
     } catch (error) {
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



