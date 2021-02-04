const mongoose = require('mongoose');

const sousCategorySchema = new mongoose.Schema({
    sousCatName :{
        type : String,
        required : true
    }
})

const SCategory = mongoose.model('SCategory',sousCategorySchema);

module.exports = SCategory