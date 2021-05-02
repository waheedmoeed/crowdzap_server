const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListedProps = new Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
      country:{
          type: String,
          required: true
      },
      city:{
          type: String,
          required: true
      }
  },
  geoLocation: {
    lat:{
      type: Number,
      required: true
    },
    long:{
        type:Number,
        required:true
    }
  },
  detail: {
    type: String,
    required: true,
  },
  officalDocs:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  endDate:{
    type: Date,
    required: true
  },
  mainImg:{
      type: String,
      required: true
  },
  galleryImages:{
      type: [String],
      required: true
  },
  nodeId:{
      type: String,
      required: true,
      trim:true
  },
  nodeName:{
      type: String,
      required: true
  },
  contractAddress:{
      type: String,
      required: true,
      trim:true,
      unique: true
  },
  contractType:{
    type:String,
    required: true
  },
  userId:{
    type: mongoose.Types.ObjectId,
    required: true
  }
},
{
  timestamps: true,
},
);

//Filter By any given condition
ListedProps.statics.filterByCity= function(filter){
  return new Promise((resolve, reject) => {
    ListedPropsModel.find({'location.city':{'$regex': filter.city,$options:'i'}}, (err, data)=>{
      if (err) return reject(err)
      resolve(data)
    })
  })
}

const ListedPropsModel = mongoose.model("listedProps", ListedProps);

module.exports = ListedPropsModel
