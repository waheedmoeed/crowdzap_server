const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CryptoOrderSchema = new Schema({
    clientAddress:{
        type: String,
        required: true,
    },  
	amount:{
        type: Number,
        required: true,
    },
	nodeName:{
        type: String,
        required: true,
    },
	orderTime:{
        type: Date,
        default: Date.now,
    },
	cryptoTranHash:{
        type: String,
        required: true,
    },
    cryptoType:{
        type: String,
        required: true
    },
	userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
	transactionId:{
        type: String,
        default: ""
    },
    processed:{
        type: Number,
        default: 1 //0 for ok, 1 for processing and 2 for cancel
    }
},
{
  timestamps: true,
},
);

module.exports = CryptoOrder = mongoose.model("cryptoOrder", CryptoOrderSchema);
