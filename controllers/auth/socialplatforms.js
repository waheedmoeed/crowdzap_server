const {Container} = require("typedi")
let logger = require("winston").loggers.get("SocialPlatforms.js")

exports.getAllAttachedAccounts= async (req, res)=>{
    try {
        const socialPlatformService = Container.get("SocialPlatformService")
        const response = await socialPlatformService.getAllAttachedAccounts(req.userId)
        res.status(200).json({data:response})
    }catch (error) {
        logger.error('🔥 error: '+ error);
        //return next(e);
        return res.status(200).json({
            error: "Failed to get all attached accounts",
        });
    }
}

exports.getInstBasic = (req, res)=>{
    return "hello"
}

exports.getInstGraph = (req, res)=>{
    return "hello"
}

exports.storeInstBasic = async (req, res)=>{
    let data = {
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const socialPlatformService = Container.get("SocialPlatformService")
        const response = await socialPlatformService.storeInstBasic(data)
        res.json({data:response})
    }catch (error) {
        logger.error('🔥 error: '+ error);
        //return next(e);
        return res.status(200).json({
            error: "Failed to store basic tokens",
        });
    }
}

exports.storeInstGraph = async (req, res)=>{
    let data = {
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password
    }
    console.log(data)
    try {
        const socialPlatformService = Container.get("SocialPlatformService")
        const response = await socialPlatformService.storeInstGraph(data)
        res.json({data:response})
    }catch (error) {
        logger.error('🔥 error: '+ error);
        //return next(e);
        return res.status(200).json({
            error: "Failed to store basic tokens",
        });
    }
}
