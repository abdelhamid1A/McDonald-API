var express = require('express');
var router = express.Router();
const Category = require('../model/Category')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    message : 'ok'
  })
});

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

router.get('/all',(req,res)=>{
  Category.find()
  .then(doc=>{
    res.send(doc)
  })
  .catch(err=>{
    console.log(err);
  })
})

module.exports = router;
