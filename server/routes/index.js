var express = require('express');
var router = express.Router();
const Category = require('../model/Category')
const SCategory = require('../model/souscategory')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    message : 'ok'
  })
});
// add category 
router.post('/addcategory',(req,res)=>{

  // console.log(req.body);
  const category = new Category({
    catName : req.body.name
  })
  category.save()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })

})
// show all category 
router.get('/all',(req,res)=>{
  Category.find()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})

// add sous category 
router.post('/saddcategory',(req,res)=>{

  // console.log(req.body);
  const sousCat = new SCategory({
    sousCatName : req.body.name
  })
  sousCat.save()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })

})
// show all sous category 
router.get('/sall',(req,res)=>{
  SCategory.find()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router;
