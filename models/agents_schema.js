const mongoose = require('mongoose');

const { Schema } = mongoose;
const Agt_schm = new Schema({

    AgtFirstName: {
        type: String,
        required: true,
    },
    AgtLastName: {
        type: String,
        required: true,
    },
    AgtBusPhone: {
        type: String,
        required: true,
    },
    AgtEmail: {
        type: String,
        required: true,
    },
    AgencyId: {
        type: String,
        required: true,
    },
    AgtMiddleInitial: {
        type: String,
        required: true,
    },
    AgentId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('agents', Agt_schm);
