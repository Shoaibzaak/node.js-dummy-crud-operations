const validator = require('../helpers/validator');
const Validator = async (req, res, next) => {
    const validationRule = {
        
        "name": "required|string",
        
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = Validator

