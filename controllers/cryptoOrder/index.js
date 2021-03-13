const {Container} = require("typedi")

const dotenv = require("dotenv");
dotenv.config();

let logger = require("winston").loggers.get("CryptoOrderController.js")

exports.createCryptoOrderController = async (req, res) => {
    let cryptoOrderObj  = {...req.body}
    cryptoOrderObj['userId'] = req.userId;
    try{
        const cryptoOrderService = Container.get("CryptoOrderService")
        let response = await cryptoOrderService.CreateCryptoOrder(cryptoOrderObj)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Fail to place crypto buy order, because already another order placed for you"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Crypto Order failed with Local API",
        });
    }
}

exports.processCryptoOrderController = async (req, res) => {
    let cryptoOrderObj  = {...req.body}
    try{
        const cryptoOrderService = Container.get("CryptoOrderService")
        let response = await cryptoOrderService.ProcessCryptoOrder(cryptoOrderObj)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Fail to update crypto order status"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Crypto Order failed with Local API",
        });
    }
}

exports.getCryptoOrderController = async (req, res) => {
    let filterCond  = {[req.query.key] : req.query.value}
    try{
        const cryptoOrderService = Container.get("CryptoOrderService")
        let response = await cryptoOrderService.GetCryptoOrder(filterCond)
        if (response) return res.status(200).json({data: response});
        return res.status(201).json({data: null})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Failed to get any orders",
        });
    }
}