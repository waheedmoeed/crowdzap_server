require("dotenv").config();

const jwt = require("jsonwebtoken")
const mySecret = process.env.JWT_SECRET;

getWithAuth = function(req, res, next){
    const token =(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
                 (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')

    if(token){
        jwt.verify(req.headers.authorization.split(' ')[1], mySecret, function(error, decoded){
            if(error){
                res.statusCode = 401
                res.json({"error":{"Unauthorization": "Token is not valid"}})
            }else{
                req.userId = decoded._id
                next()
            }
        })
    }else{
        res.statusCode=401
        res.json({"error":{"Unauthorization": "Token is not available"}})
    }
}

postWithAuth = function(req, res, next){
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.headers.authorization ||
        req.cookies.token;
    res.setHeader("Content-Type", "application/json");
    if(token){
        jwt.verify(token, mySecret, function(error, decoded){
            if(error){
                res.statusCode = 200
                res.json({"error":{"Unauthorization": "Token is not valid"}})
            }else{
                if(req.body.userId === decoded.id){
                    next()
                }else{
                    res.statusCode = 200
                    res.json({"error":{"Unauthorization": "Parameters does not match token data"}})
                }
            }
        })
    }else{
        res.statusCode = 200
        res.json({"error":{"Unauthorization": "Token is not available"}})
    }
}
module.exports = {getWithAuth, postWithAuth}