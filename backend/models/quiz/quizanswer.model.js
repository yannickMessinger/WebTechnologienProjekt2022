//Mongoose Schema for Todo Object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Answer = new Schema ({
    answer_id: {
        type: String
    },
    answer_content: {
        type: String
    },
   
});

module.exports = mongoose.model('Answer', Answer)