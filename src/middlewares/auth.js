
var jwt = require('jsonwebtoken');
module.exports.authenticate =(req, res, next) => {
    var authorization = req.header('Authorization');
    
    if (authorization) {
        var token = authorization.split(' ');

            jwt.verify(token[1], process.env.JWT_SECRETE, function(err, token_decoded) {
                if (err) {
                    return res.json({
                                status: 'Fail',
                                systemfailure: false,
                                message: 'Failed to authenticate token.',
                                jsonerr: { message:  'Failed to authenticate token.'}
                            });
                        } else {
                        req.token_decoded = token_decoded;
                        next();
                }
            });
    } else {
        res.sendStatus(401);
    }
};
