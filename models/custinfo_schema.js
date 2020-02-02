const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;
const Cust_schm = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pword: {
        type: String,
        required: true,
    },
    addr1: {
        type: String,
        required: true,
    },
    addr2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    pv: {
        type: String,
        required: true,
    },
    pcode: {
        type: String,
        required: true,
    },

});

// verify the password of the User documment
Cust_schm.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', process.env.PASS_SALT)
                      .update(password)
                      .digest('base64');

    return this.pword === encrypted;
}

Cust_schm.statics.findOneByUsername = function(userid) {
    return this.findOne(
        { email:userid }, ['email', 'fname', 'pword']).exec();
        //{ projection: { _id: 0, email:1, fname:1, pword:1 } }).exec();
}

module.exports = mongoose.model('customers', Cust_schm,'customers');
