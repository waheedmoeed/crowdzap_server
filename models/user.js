const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  profileImg:{
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: String,
    default: "subscriber",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  keys:{
      type:[
        {
          keyTag: {
          type: String
        },
        address:{
          type: String
          }
        },
        {
          type:Number
        }
    ]
  },
  investments:[
      {
        transactionHash:"",
        tokens:"",
        contractAddress:""
      }
  ]
},
{
  timestamps: true,
},
);

module.exports = User = mongoose.model("users", UserSchema);
