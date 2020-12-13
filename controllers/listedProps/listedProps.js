const {Container} = require("typedi")

const dotenv = require("dotenv");
dotenv.config();

let logger = require("winston").loggers.get("ListedPropController.js")

exports.createlistedPropsController = async (req, res) => {
    let listedPropObj  = {...req.body}
    listedPropObj['userId'] = req.userId;
    try{
        const listedPropService = Container.get("ListedPropService")
        let response = await listedPropService.CreateListProp(listedPropObj)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Fail to create list new property, already property listed"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Listing Property failed with Local API",
        });
    }
}

exports.getListedPropsController = async (req, res) => {
    let filterCond  = {[req.query.key] : req.query.value}
    try{
        const listedPropService = Container.get("ListedPropService")
        let response = await listedPropService.GetListedProps(filterCond)
        if (response) return res.status(200).json({status: "ok", data: response});
        return res.status(201).json({status: "No Listed Prop Founded"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Listing Property failed with Local API",
        });
    }
}