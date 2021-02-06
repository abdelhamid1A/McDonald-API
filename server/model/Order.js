const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productName :{
        type : String,
        required : true
    },
    productPrice :{
        type : Number,
        required : true
    },
    productQte :{
        type : Number,
        required : true
    },
    tableNumber :{
        type : Number,
        required : true
    }
    
})

const Order = mongoose.model('Order',orderSchema);

module.exports = Order