const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const pageRouter = require('./routes/page');
const connect = require('./models');
const {authMiddleware} = require('./models/controller');

require('dotenv').config();

const app = express();
connect(true);

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cookieParser());
app.use(authMiddleware); // check login
app.use('/', pageRouter);

app.use((req, res)=>{
    const fs = require('fs');
    res.writeHead(404, 'NOT FOUND');
    res.end(fs.readFileSync('./public/404.html'));
})

app.use((req, res, next)=> {
    res.locals.message=err.message;
    res.locals.error= req.app.get('env')==='development'? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=> {
    console.log('Server is listening port '+app.get('port'));
});

