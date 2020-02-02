const jwt = require('jsonwebtoken');
const CustInfo = require('./custinfo_schema');

exports.login = (req, res) => {
    const {email, pword} = req.body
    const secret = process.env.JWT_SECRET;
    const username='';
    // check the user info & generate the jwt
    const check = (user) => {
        if(!user) { // user does not exist
            throw new Error('login failed');
        } else { // user exists, check the password
            if(user.verify(pword)) { // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            email: user.email,
                            fname: user.fname
                        }, 
                        secret, 
                        {
                            expiresIn: 31536000, // = 60*60*24*365, 1 year
                            issuer: 'frank',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err);
                            resolve(token);
                        });
                });
//                username=user.fname;
                return p
            } else {
                throw new Error('login failed');
            }
        }
    }

    // respond the token after passing verify
    const respond = (token) => {
        res.writeHead(200, {'Set-Cookie': `x-access-token=${token}` });
        res.end('Login Succeed');
        res.redirect('/packages');
    }

    // error occured
    const onError = (error) => {
        res.end('Wrong email or password');//+username); 
        res.redirect('/');
    }

    // find the user
    CustInfo.findOneByUsername(email)
    .then(check)
    .then(respond)
    .catch(onError);

}  // end of login



exports.authMiddleware = (req, res, next) => {
    // read the token from header or url 
    const token = req.cookies['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        console.log('could not find token.');
        req.decoded=undefined;
        next();
    }else {
        // create a promise that decodes the token
        const p = new Promise(
            (resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                    if(err)  reject(err);
                    resolve(decoded)
                })
            }
        )

        // if it has failed to verify, it will return an error message
        const onError = (error) => {
            console.log('auth error occur');
            req.decoded=undefined;
            res.status(403).json({
                success: false,
                message: error.message
            })
        }

        // process the promise
        p.then((decoded)=>{
            req.decoded = decoded
            next()
        }).catch(onError)
    }
}  //authMiddleware