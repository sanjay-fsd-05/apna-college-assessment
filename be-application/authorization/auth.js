const jwt = require('jsonwebtoken')
const authorization = (req, res, next) => {
    let token;
    const authHeader = req.headers['authorization']
    if(authHeader !== undefined) {
        token = authHeader.split(' ')[1]
    }
    if(token === undefined) {
        res.status(401).send({message: 'Invalid Token'})
    } else {
        jwt.verify(token, 'MY_SECRET_KEY', (err, payload) => {
            if(err) {
                res.status(401).send({message: 'Invalid Token'})
            } else {
                req.user = payload;
                next()
            }
        })
    }
}
module.exports = {authorization}