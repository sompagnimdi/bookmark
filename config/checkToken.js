const jwt = require(jsonwebtoken)

module.exports = (req, res, next) => {
    let token = req.get('Authoorization')

    if(token){
        token = token.replace('Bearer', '')
        jwt.verify(token, process.env.SECRET, function( err, decoded){
            req.user = err ? null : decoded.user
            req.exp = err ? null : new Date(decoded.expo * 1000)
            res.locals.data.email = decoded.user.email
        })
        return 
        next()
    } else {
        req.user = null
        return next()
    }
}

