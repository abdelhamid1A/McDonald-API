const mongoose = require('mongoose');

const ingreSchema = new mongoose.Schema({
    elements :{
        type : String,
        required : true
    }
})

const Ingredien = mongoose.model('Ingredien',ingreSchema);

module.exports = Ingredien