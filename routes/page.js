const express = require('express');
const router = express.Router();
const fs = require('fs');
//var Contacts = require('../models/contacts');
var AreaLink = require('../models/arealink_schema');
var SliderLink = require('../models/slider_schema');
var CardLink = require('../models/card_schema');
var AgtInfo = require('../models/agents_schema');
var CustInfo = require('../models/custinfo_schema');
const crypto = require('crypto');
const {login} = require('../models/controller');

const checkLogin = (req, res, data)=> {
    const strLogin = 
    `<li><a href="#" id="joinus">Join Us</a></li>
    <li><a href="#" id="login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>`;

    if(req.decoded) {
        console.log('have token');
        res.end(data.toString().replace(/LOGINOUT/g, 
            `<li><a href='#'> Hi. ${req.decoded['fname']}</a></li>
            <li><a href='#' id='logout'><span class='glyphicon glyphicon-log-out'></span> LogOut</a></li>` ));
    }else {
        console.log('do not have token');
        res.end(data.toString().replace(/LOGINOUT/g, strLogin ));
    }
}

router.get('/', (req, res)=>{
    //res.end(fs.readFileSync('./public/index.html'));
    return fs.readFile('./html/index.html', (err, data)=>{
        if(err) {throw err;}
        checkLogin(req, res, data);
    });
});

router.get('/packages', (req, res)=>{
    console.log('packages');
//    res.end(fs.readFileSync('./html/packages.html'));
    return fs.readFile('./html/packages.html', (err, data)=>{
        if(err) {throw err;}
        checkLogin(req, res, data);
    });
});

router.get('/about', (req, res)=>{
//    res.end(fs.readFileSync('./html/about.html'));
    return fs.readFile('./html/about.html', (err, data)=>{
        if(err) {throw err;}
        checkLogin(req, res, data);
    });
});

router.post('/arealink', (req, res)=>{
    if(req.xhr){
        AreaLink.find({},{_id:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));
        })//.then(connect(false))    
    }else {
        res.redirect('/');     
    }
});

router.post('/sliderlink', (req, res)=>{
    if(req.xhr){
        SliderLink.find({},{_id:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));
        })//.then(connect(false))    
    }else {
        res.redirect('/');
    }
});

router.post('/cardlink', (req, res)=>{
    if(req.xhr){
        CardLink.find({},{_id:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));
        })//.then(connect(false))
    }else
        res.redirect('/');     
});

router.post('/cardlink_cat', (req, res)=>{
//    console.log('/cardlink')
    if(req.xhr){
        CardLink.find({"title":req.body.title},{_id:0})
        .then((dat)=>{
            console.log(dat);
            res.end(JSON.stringify(dat));
        })//.then(connect(false))
    }else
        res.redirect('/');     
});
    
router.post('/agtinfo_s', (req, res)=>{
    if(req.xhr){
        AgtInfo.find({"AgtPosition":"Senior Agent"},{_id:0, AgentId:0, AgtMiddleInitial:0, AgencyId:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));

        })//.then(connect(false))    
    }else
        res.redirect('/');     
});

router.post('/agtinfo_i', (req, res)=>{
    if(req.xhr){
        AgtInfo.find({"AgtPosition":"Intermediate Agent"},{_id:0, AgentId:0, AgtMiddleInitial:0, AgencyId:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));
        })//.then(connect(false))    
    }else
        res.redirect('/');     
});
router.post('/agtinfo_j', (req, res)=>{
    if(req.xhr){
        AgtInfo.find({"AgtPosition":"Junior Agent"},{_id:0, AgentId:0, AgtMiddleInitial:0, AgencyId:0})
        .then((dat)=>{
            res.end(JSON.stringify(dat));
        })//.then(connect(false))    
    }else
        res.redirect('/');     
});

router.post('/login', (req, res)=>{
    console.log('login :'+JSON.stringify(req.body));

    if(req.xhr){
        login(req, res);
        //res.end('We will contact you later to '+req.body.uname);
    }else
        res.redirect('/');        
});

router.post('/joinus', (req, res)=>{
//    console.log(JSON.stringify(req.body));

    if(req.xhr){
        const encrypted = crypto.createHmac('sha1', process.env.PASS_SALT)
        .update(req.body.pword)
        .digest('base64');

        const customer = new CustInfo({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            pword: encrypted,
            addr1: req.body.addr1,
            addr2: req.body.addr2,
            city: req.body.city,
            pv: req.body.pv,
            pcode: req.body.pcode,
        });
        customer.save();

        req.session.login_member=req.body.fname;
        // 여기에도 jwt 만들어서 쿠키로 보내는것 추가해야함.
        res.end('Thank you '+req.body.fname+' '+req.body.lname+' for registering with Travel Experts.');
    }else
        res.redirect('/');        
});

module.exports = router;