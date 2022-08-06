import dbConnect from "../../../database/lib/dbConnect";
import offers from "../../../database/schema/offers";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


const updateOfferSchema = Joi.object({
    _id: Joi.string().required(),
    country: Joi.object(),
    state: Joi.object(),
    city: Joi.object(),
    title: Joi.string(),
    offerType: Joi.object().required(),
    product: Joi.object().optional().allow(''),
    couponCode: Joi.string().allow('').optional(),
    usageLimit: Joi.string().allow('').optional(),
    // user: Joi.string(),
    discountType: Joi.string().allow(''),
    discount: Joi.string().allow(''),
    image: Joi.string(),
    validityStartDate: Joi.string().allow('').allow(null),
    validityEndDate: Joi.string().allow('').allow(null),
    // add conditional requierd for coupon code and discount
    validity: Joi.string().required(),
    description: Joi.string().required(),
});

async function updateOffer(req, res) {

    await dbConnect();
    try {
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateOfferSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let OfferData = _.pick(req.body, [
                "_id",
                "country",
                "state",
                "city",
                "title",
                "offerType",
                "productId",
                "couponCode",
                "usageLimit",
                "userId",
                "discountType",
                "discount",
                "validity",
                "validityStartDate",
                "validityEndDate",
                "description",
            ]);

            setData = {
                country: OfferData.country,
                state: OfferData.state,
                city: OfferData.city,
                title: OfferData.title,
                offerType: OfferData.offerType,
                productId: OfferData.productId,
                couponCode: OfferData.couponCode,
                usageLimit: OfferData.usageLimit,
                userId: OfferData.userId,
                discountType: OfferData.discountType,
                discount: OfferData.discount,
                validity: OfferData.validity,
                validityStartDate: OfferData.validityStartDate,
                validityEndDate: OfferData.validityEndDate,
                description: OfferData.description,
            };
            let updateModule = await offers.findOneAndUpdate({ _id: OfferData._id }, { $set: setData });
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Offer Updated Successfully.",
            });
        } catch (e) {
            console.log("updateOffer err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Offer Update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(updateOffer, 'offerPage', 'image'));