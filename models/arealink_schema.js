const mongoose = require('mongoose');

const { Schema } = mongoose;
const AreaLink_schm = new Schema({
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
});

module.exports = mongoose.model('areaLink', AreaLink_schm, 'areaLink');
