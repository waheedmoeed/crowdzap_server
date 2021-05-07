const {Container} = require("typedi")

const dotenv = require("dotenv");
dotenv.config();

let logger = require("winston").loggers.get("ListedPropController.js")

exports.addNewInvestmentController = async (req, res) => {
    let investmentObj  = {...req.body};
    try{
        if(req.userRole === "subscriber"){
            const investmentService = Container.get("InvestmentService")
            let response = await investmentService.AddNewInvestment(investmentObj, req.userId)
            if (response) return res.status(200).json({status: "ok"});
            return res.status(201).json({status: "Fail to add new investment into portfolio"})
        }else{
            return res.status(400).json({status: "Fail to add new investment into portfolio"})
        }

    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Listing Property failed with Local API",
        });
    }
}


exports.restInvestment = async (req, res) => {
    try{
        const userService = Container.get("UserService")
        let response = await userService.ResetInvestment(kycObj)
        if (response) return res.status(200).json({status: "ok"});
        return res.status(201).json({status: "Already KYC Process done"})
    }catch(e){
        logger.error('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Kyc processing failed with Local API",
        });
    }
}