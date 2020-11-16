const {Container} = require("typedi")
const bcrypt = require("bcrypt")

class SocialPlatformsService{
    socialPlatformsModel
    constructor() {
        this.socialPlatformsModel = Container.get("social_platforms")
    }

    async getAllAttachedAccounts(userId){
        let doc = await this.socialPlatformsModel.findOne({user_id:userId})
        if(doc){
            let accounts = doc.toObject()
            Reflect.deleteProperty(accounts, 'createdAt');
            Reflect.deleteProperty(accounts, 'updatedAt');
            Reflect.deleteProperty(accounts, '__v');
            Reflect.deleteProperty(accounts.instagram, '_id');
            if(accounts.instagram.basic_instagram){
                accounts.instagram.basic_instagram = {connected:true}
            }

            return accounts
        }
        return null
    }

    //getters for tokens/data of social platforms
    async getInstBasic(userId){
        let doc = await this.socialPlatformsModel.findOne({user_id:userId})
        if(doc){
            let accounts = doc.toObject()
            Reflect.deleteProperty(accounts, 'createdAt');
            Reflect.deleteProperty(accounts, 'updatedAt');
            return accounts.instagram.basic_instagram
        }else{
            return null
        }
    }

    async getInstGraph(){
    }

    //setters for token/data of social platforms
    async storeInstBasic(data){
        let doc = await this.socialPlatformsModel.findOne({user_id:data.userId})
        if(doc){
            //let passwordHash = await this.encryptPassword(data.password)
            //if(!passwordHash) throw new Error("Failed to encrypt data")
            doc.instagram.basic_instagram = {
                email: data.email,
                password: data.password
            }
            let res = await this.socialPlatformsModel.updateOne({user_id:data.userId}, doc)
                return {"code":2, "msg":"Updated basic instagram credentials"}
        }else{
            let socialPlatformsDoc = this.socialPlatformsModel({
                user_id : data.userId,
                instagram: {
                    basic_instagram:{
                        email: data.email,
                        password: data.password
                    }
                }
            })
            let newDoc = await this.socialPlatformsModel.create(socialPlatformsDoc)
            if(!newDoc) throw new Error("Failed to create new social platform document")
            return {"code":1, "msg":"Basic Instagram stored successfully"}
        }
    }

    async storeInstGraph(data){
        return "yet to implement"
    }

}


module.exports = SocialPlatformsService