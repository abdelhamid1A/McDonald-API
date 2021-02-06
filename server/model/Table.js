const mongoose = require('mongoose');

const tableShema = new mongoose.Schema({
    tableNumber :{
        type : String,
        required : true
    },
    available :{
        type : Boolean,
        default : true
    }
})

const Table = mongoose.model('Table',tableShema);

module.exports = Table