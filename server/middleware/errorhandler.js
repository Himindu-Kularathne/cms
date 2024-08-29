const {constants} =  require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR :
            res.json(
                {
                    title : "Validation Error",
                    message : err.message,
                    stackTrace : err.stack,
                }
            )
            
            break;
        case constants.FORHIBIDDEN :
        res.json(
            {
                title : "Forhibidden",
                message : err.message,
                stackTrace : err.stack,
            }
        )
        
        break;

        case constants.UNAUTHARIZED :
            res.json(
                {
                    title : "Unauthorized",
                    message : err.message,
                    stackTrace : err.stack,
                }
            )
            
            break;
        
        case constants.NOT_FOUND:
            res.json(
                {
                    title : "Page Not Found",
                    message : err.message,
                    stackTrace : err.stack,
                }
            )
    
        default:
            break;
    }

};

module.exports= errorHandler;