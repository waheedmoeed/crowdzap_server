const {Container} = require("typedi")

module.exports = class InvestmentsService {
    userModel

    constructor() {
        this.userModel = Container.get("userModel")
    }

    //add new user investment in DB
    async AddNewInvestment(investmentObj, userId) {
        const userObj = await this.userModel.findOneAndUpdate(
            {_id: userId},
            {
                "$push": {
                    "investments": investmentObj
                    }
                },
            { new: true, upsert: false })
        if (userObj) {
            return true
        } else {
            return false
        }
    }

    async ResetInvestment(){
        const err = await this.investmentModal.deleteMany({})
        if(err) return null
        return {}
    }
}