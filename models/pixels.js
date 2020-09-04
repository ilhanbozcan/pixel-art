let mongoose = require('mongoose');



let pixelsSchema = mongoose.Schema({
    row:{
        type: String,
        required: true
    },
    column:{
        type: String,
        required: true
    },
    color:{
        type: String
    },
   
    
});

 module.exports = mongoose.model('pixels',pixelsSchema);
