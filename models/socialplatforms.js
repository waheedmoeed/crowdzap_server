const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Inst_Schema = require("../models/instagram")
// Create Schema
const SocialPlatforms = new Schema({
        user_id: {type: mongoose.Types.ObjectId, trim: true, required: [true, "Registered User Id is required"], unique:true},
        instagram: {type: Inst_Schema},
        //Todo: add schema for other files
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = User = mongoose.model("social_platforms", SocialPlatforms);
