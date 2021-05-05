const {celebrate, Joi} =require("celebrate")

const express = require("express");
const {getWithAuth} = require("../middlewares")
const router = new express.Router();

const { createCryptoOrderController, getCryptoOrderController, processCryptoOrderController } = require("../../controllers/cryptoOrder");

module.exports = (app)=> {
    app.use("/crypto",router)

    router.post(
        "/order_crypto",
        getWithAuth,
        celebrate({
            body: Joi.object({
                clientAddress: Joi.string().required(),
                amount: Joi.number().required(),
                nodeName: Joi.string().required(),
                fiatCurrencyTranId:Joi.string().required(),
                cryptoType: Joi.string().required(),
            })
        }),
        createCryptoOrderController);
        router.post(
            "/order_processed",
            getWithAuth,
            celebrate({
                body: Joi.object({
                    orderId: Joi.string().required(),
                    transactionId: Joi.string().required()
                })
            }),
            processCryptoOrderController);

    router.get(
        "/get_crypto_orders",
        getWithAuth,
        getCryptoOrderController);
}
