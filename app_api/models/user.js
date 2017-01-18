var mongoose = require('mongoose');

var loginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {
        type: String,
        required: true,
        unique:true
    },
    hash:String,
    salt:String
});

mongoose.model('User', loginSchema);