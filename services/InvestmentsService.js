const {Container} = require("typedi")

module.exports = class InvestmentsService {
    investmentModal

    constructor() {
        this.investmentModal = Container.get("investmentModel")
    }

    //add new user investment in DB
    async AddNewInvestment(investmentObj, userId) {       
        const investment = new  this.investmentModal(investmentObj)
        const investDoc = await this.investmentModal.create(investment)
        if(!investDoc) throw new Error("Fail to store investment order")
        return investDoc
    }

    async ResetInvestment(){
        const err = await this.investmentModal.deleteMany({})
        if(err) return null
        return {}
    }
}