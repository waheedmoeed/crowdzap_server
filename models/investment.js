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
    trim: true,
    required: true,
    unique: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  userId:{
      type: String,
      required : true,
    unique: true
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
