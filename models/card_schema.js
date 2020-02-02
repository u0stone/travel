const mongoose = require('mongoose');

const { Schema } = mongoose;
const Card_schm = new Schema({
    title: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    start: {
        type: String,
        required: false,
    },
    end: {
        type: String,
        required: false,
    }, 
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },                      
});

module.exports = mongoose.model('cardLink', Card_schm, 'cardLink');
