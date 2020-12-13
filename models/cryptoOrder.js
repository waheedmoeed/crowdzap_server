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
	transactionId:{
        type: String,
        required: true,
    },
    processed:{
        type: Boolean,
        default: false
    }
},
{
  timestamps: true,
},
);

module.exports = CryptoOrder = mongoose.model("cryptoOrder", CryptoOrderSchema);
