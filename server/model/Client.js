const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    code:{
        type : Number
    },
    points:{
        type :Number
    }
})

const Client = mongoose.model('Client',clientSchema);

module.exports = Client