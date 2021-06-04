const {Container} = require("typedi")
const investment = require("../models/investment")

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

    //add new user investment in DB
    async TransferInvestment(investmentObj, userId) {       
        const investDoc = await this.investmentModal.findOneAndUpdate({
            _id: investmentObj.investmentId,            
        },
        {
            transactionHash:investmentObj.transactionHash,
            investmentType:"Recieved",
            userId: investmentObj.toId,
            senderAddress: investmentObj.senderAddress,
            senderName: investmentObj.senderName
        }
        )
        if(!investDoc) throw new Error("Fail to update investment order")
        return investDoc
    }

    async GetListedProps(userId){
        let investments = await this.investmentModal.find({userId: userId})
        return investments             
    }

    async PopulateDB(){
        let investments = this.investmentsGeneration()
        investments.forEach(async element => {
            const investment = new  this.investmentModal(element)
            const investDoc = await this.investmentModal.create(investment)
            if(!investDoc) throw new Error("Fail to store investment order")
        });
        return
    }

    async ResetInvestment(){
        const err = await this.investmentModal.deleteMany({})
        if(err) return null
        return {}
    }

    investmentsGeneration(){
        let investments = [
            {
                contractAddress:"cosmos18trlzjp04flp4u3yugxeqwymxw878wry66dvu7",
                amount: 20,
                transactionHash: "1",
                contractType: "basic",
                userId:"60a6948f1160e33abcea132b"
            },
            {
                contractAddress:"cosmos1rwlzqrtlr5pz05vr5a834828msuh0j5036205k",
                amount: 20,
                transactionHash: "2",
                contractType: "basic",
                userId:"60a6948f1160e33abcea132b"
            },
            {
                contractAddress:"cosmos1athmuuk6q6gqczn4lys63v5zfe6vcecpx9uxvq",
                amount: 30,
                transactionHash: "3",
                contractType: "basic",
                userId:"60a6948f1160e33abcea132b"
            },
            {
                contractAddress:"cosmos1dwlghvcltkhst90a7r6gnrsrl09upu99k8ga6n",
                amount: 40,
                transactionHash: "4",
                contractType: "basic",
                userId:"60a6948f1160e33abcea132b"
            }
        ]
        return investments
    }
}