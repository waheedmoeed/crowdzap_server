const logger =require("winston").loggers
const UserService = require("../services/UserService")
const ListedPropService = require("../services/ListedPropService")
const CryptoOrderService = require("../services/CryptoOrderService")

const {Container} =  require('typedi')

module.exports = (data)=>{
    data.models.forEach(m => {
        Container.set(m.name, m.model);
    });
    //add other dependency that are needed

    Container.set("UserService", new UserService())
    Container.set("ListedPropService", new ListedPropService)
    Container.set("CryptoOrderService", new CryptoOrderService)
    Container.set("logger", logger)
}