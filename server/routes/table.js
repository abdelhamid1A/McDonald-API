var express = require('express');
var router = express.Router();
const Table = require('../model/Table')
const mongoose = require('mongoose');

router.get('/getfree',(req,res)=>{
    Table.find({available:true})
    .then(doc => {
      res.send(doc)
    })
    .catch(err => {
      console.log(err)
    })
  })

module.exports = router