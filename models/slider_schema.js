const mongoose = require('mongoose');

const { Schema } = mongoose;
const Slider_schm = new Schema({
    title: {
        type: String,
        required: true,
    },
    href: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('sliderlink', Slider_schm, 'sliderlink');
