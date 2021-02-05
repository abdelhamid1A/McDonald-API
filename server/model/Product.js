const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName :{
        type : String,
        required : true
    },
    productPrice :{
        type : Number,
        required : true
    },
    category:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'souscategory'
    },
    ingredien:{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Ingrediens'
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product