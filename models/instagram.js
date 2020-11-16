const Schema = require("mongoose").Schema

let Inst_Token = new Schema({
    basic_instagram: {
        email: {type:String},
        password: {type:String}
    },
    graph_instagram: {
        name: {type:String},//Todo: Change it to the tokens requirement
        password: {type:String}
    }
})

module.exports = Inst_Token