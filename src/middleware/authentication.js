const jwt = require('jsonwebtoken');
const secret = "securesecret"



exports.authenticateUser = (req, res, next) => {
    //check if there is authorization token
    if(!req.headers.authorization) {
        return res.status(401).json({message: "authorization header required"})
    }


    let splittedHeader = req.headers.splittedHeader.split('');
    console.log(splittedHeader)
    if(splittedHeader[0] !== "Bearer") {
        return res.status(401).json({message: " authroization is bearer <token>"})
    }
    let token = splittedHeader[1];
    jwt.verify(token, secret, (err, decodedtoken) => {
         if(err) {
             return res.status(500).json({err})
         } if(!decodedtoken){
             return res.status(401).json({message: "not a decode token, please login"})
         } 
         next()
         
    })
}

exports.checkIfAdmin = (req, res, next) => {
if(req.user.role !== "admin") {
    return res.status(400).json({message : "no admin permissions"})
}
return next()
}