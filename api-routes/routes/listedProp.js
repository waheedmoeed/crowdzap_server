const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {getWithAuth} = require("../middlewares")
const router = new express.Router();

const { createlistedPropsController, filterListedPropsController, getListedPropsController } = require("../../controllers/listedProps/listedProps");

module.exports = (app)=> {
    app.use("/property",router)

    router.post(
        "/create_listed_prop",
        getWithAuth,
        celebrate({
            body: Joi.object({
                title: Joi.string().required(),
                location: Joi.object().keys({
                    country: Joi.string().required(),
                    city: Joi.string().required()
                }),
                geoLocation: Joi.object().keys({
                    lat: Joi.number().max(900000000).required(),
                    long: Joi.number().max(900000000).required()
                }),
                description: Joi.string().required(),
                endDate: Joi.date().required(),
                officialDocs:Joi.string().required(),
                mainImg:Joi.string().required(),
                galleryImages: Joi.array().required(),
                nodeId: Joi.string().required().required(),//change it according to cosmos validator address/public key
                nodeName: Joi.string().required(),
                contractAddress: Joi.string().required(), 
                contractType: Joi.string().required(),
                totalSupply: Joi.number().max(900000000).required(),
                tokenPrice: Joi.number().max(900000000).required()
            })
        }),
        createlistedPropsController);
        
    router.get(
        "/get_listed_props",
        getListedPropsController);
}
