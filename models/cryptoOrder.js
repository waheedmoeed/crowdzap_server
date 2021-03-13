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
	fiatCurrencyTranId:{
        type: String,
        required: true,
    },
	userId:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    cryptoType:{
        type:String,
        required: true
    },
	transactionId:{
        type: String,
    },
    processed:{
        type: Number,
        default: 1
    }
},
{
  timestamps: true,
},
);

module.exports = CryptoOrder = mongoose.model("cryptoOrder", CryptoOrderSchema);
