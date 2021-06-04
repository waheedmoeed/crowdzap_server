const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const InvestmentSchema = new Schema({
  contractAddress: {
    type: String,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionHash: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  senderName:{
    type: String,
    default:"Self"
  },
  senderAddress:{
    type: String,
    default:"----"
  },
  investmentType:{
    type:String,
    default:"invested"
  },
  userId:{
      type:  mongoose.Types.ObjectId,
      required : true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
   type:String,
    default:"submitted"
  }
},
{
  timestamps: true,
},
);

module.exports = Investment = mongoose.model("investment", InvestmentSchema);
