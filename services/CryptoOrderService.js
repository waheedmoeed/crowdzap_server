const {Container} = require("typedi")

module.exports = class CryptoOrderService{
    cryptoOrderModel
    constructor() {
        this.cryptoOrderModel = Container.get("cryptoOrderModel")
    }

    //create new listedprop in DB
    async CreateCryptoOrder(cryptoOrderObj){
        const cryptoOrderDoc = await this.cryptoOrderModel.findOne({userId: cryptoOrderObj.userId})
        if (cryptoOrderDoc) {
            return false
        } else {
            const newCryptoOrder = new this.cryptoOrderModel(cryptoOrderObj);       
            const cryptoOrder = await this.cryptoOrderModel.create(newCryptoOrder)
            if(!cryptoOrder) throw new Error("Fail to place crypto buy order")
            return true
        }        
    }

    async ProcessCryptoOrder(cryptoOrderObj){
        const cryptoOrderDoc = await this.cryptoOrderModel.findOneAndUpdate({userId: cryptoOrderObj.userId}, {processed:true})
        if (cryptoOrderDoc) {
            return true
        }    
        return false     
    }


    async GetCryptoOrder(filter){
        const cryptoOrders = await this.cryptoOrderModel.find(filter)
        return cryptoOrders       
    }
}