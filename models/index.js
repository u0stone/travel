const mongoose = require('mongoose');

module.exports = (b_con) => {
    mongoose.connect( process.env.MONGO_CONNECT, {dbName: 'TrvExp'} );
    //console.log(process.env.MONGO_CONNECT);
    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', ()=>{
        console.log('connected to mongodb server');
    })
};

