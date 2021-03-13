const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const KycSchema = new Schema({
  docType: {
    type: String,
    trim: true,
    required: true,
  },
  number: {
    type: Number,
    trim: true,
    required: true,
    unique: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  doc: {
    type: String,
    required: true,
  },
  addressProof:{
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

module.exports = User = mongoose.model("kyc", KycSchema);
