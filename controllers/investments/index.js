const {Container} = require("typedi")

const dotenv = require("dotenv");
dotenv.config();

let logger = require("winston").loggers.get("InvestmentController.js")

//TODO : enable only simple user will be able ivesst    
exports.addNewInvestmentController = async (req, res) => {
    let investmentObj  = {...req.body};
    investmentObj['userId'] = req.userId;
    try{
        //if(req.userRole === "subscriber"){
            const investmentService = Container.get("InvestmentService")
            let response = await investmentService.AddNewInvestment(investmentObj, req.userId)
            if (response) return res.status(200).json({status: "ok", data: response});
            return res.status(201).json({status: "Fail to add new investment into portfolio"})
        //}else{
          //  return res.status(400).json({status: "Fail to add new investment into portfolio"})
        //}

    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Listing Property failed with Local API",
        });
    }
}


exports.resetInvestment = async (req, res) => {
    try{
        const investmentService = Container.get("InvestmentService")
        let response = await investmentService.ResetInvestment()
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "already deleted"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Failed to reset investment collection with Local API",
        });
    }
}