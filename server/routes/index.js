var express = require('express');
var router = express.Router();
const Category = require('../model/Category')
const SCategory = require('../model/souscategory')
const Product = require('../model/Product')
const Ingredien = require('../model/Ingrediens')
const mongoose = require('mongoose');


/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    message: 'ok'
  })
});
// add category 
router.post('/addcategory', (req, res) => {

  // console.log(req.body);
  const category = new Category({
    catName: req.body.name
  })
  category.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err);
    })

})
// show all category 
router.get('/all', (req, res) => {
  Category.find()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err);
    })
})


// add sous category 
router.post('/saddcategory', (req, res) => {

  // console.log(req.body);
  const sousCat = new SCategory({
    sousCatName: req.body.name,
    categoryParent: req.body.categoryParent
  })
  sousCat.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err);
    })

})
// show all sous category 
router.get('/sall', (req, res) => {
  SCategory.find()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err);
    })
})

// get all sous category linked with category 
router.get('/:categoryParent', (req, res) => {
  console.log(req.body);
  SCategory.find({ categoryParent: req.params.categoryParent })
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err)
    })
})
// router.post('/senddata',(req,res)=>{
//   console.log(req.body);
// })

// add product 
router.post('/addProduct', (req, res) => {
  const product = new Product({
    productName: req.body.productName,
    productPrice: req.body.productPrice,
    category: req.body.category,
    ingredien: req.body.ingredien

  })
  product.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err)
    })
})

// get products from category 
router.get('/products/:id', (req, res) => {
  Product.find({ category: req.params.id })
    .then(doc => {
      res.status(200).send(doc)
    })
    .catch(err => {
      console.log(err)
    })
})

// get one Product 
router.get('/product/:id', (req, res) => {
  Product.aggregate([
    { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },

    {
      $lookup: {
        from: "ingrediens",
        localField: "ingredien",
        foreignField: "_id",

        as: "ingredien",
      },
    }
  ])
  .then(doc => {
    res.send(doc)
  })
  .catch(err => {
    console.log(err)
  })
})

// add Ingredien 
router.post('/addIng', (req, res) => {
  const ingredien = new Ingredien({
    elements: req.body.elements
  })
  ingredien.save()
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router;
