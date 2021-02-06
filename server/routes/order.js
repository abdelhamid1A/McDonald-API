var express = require('express');
var router = express.Router();
const Order = require('../model/Order')
const Client = require('../model/Client')
const Product = require('../model/Product')
const mongoose = require('mongoose');

router.post('/addClient',(req,res)=>{
    const client = new Client({
        code : req.body.code,
        points : req.body.points
    })
    client.save()
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

// get points by client
router.get('/getPoints/:code',(req,res)=>{
    Client.findOne({code:req.params.code})
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})

// add order 
router.get('/getPrice/:id',(req,res)=>{
    Product.findById({_id:req.params.id})
    .select('productPrice')
    .then(doc=>{
        res.send(doc)
    })
    .catch(err=>{
        console.log(err)
    })
})





module.exports = router