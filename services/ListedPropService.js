const {Container} = require("typedi")

module.exports = class ListedPropService{
    listedpropsModel
    constructor() {
        this.listedpropsModel = Container.get("listedPropModel")
    }

    //create new listedprop in DB
    async CreateListProp(listedPropObj){
        const listedPropDoc = await this.listedpropsModel.findOne({contractAddress: listedPropObj.contractAddress})
        if (listedPropDoc) {
            return false
        } else {
            const newlistedProp = new this.listedpropsModel(listedPropObj);       
            const listedProp = await this.listedpropsModel.create(newlistedProp)
            if(!listedProp) throw new Error("Fail to create new Listed Property doc")
            return true
        }        
    }

    async GetListedProps(filterCond){
        let listedPropDocs;
        if(filterCond){
            listedPropDocs = await this.listedpropsModel.filterByCondition(filterCond)
            
        }else {
            listedPropDocs = await this.listedpropsModel.find()
        }        
        return listedPropDocs
            /*
            let listedPropObject = listedPropDocs.toObject()
                Reflect.deleteProperty(listedPropObject, 'createdAt');
                Reflect.deleteProperty(listedPropObject, 'updatedAt');
                Reflect.deleteProperty(listedPropObject, '__v');
                return listedPropObject
                */               
    }
}