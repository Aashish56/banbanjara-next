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


const createOfferSchema = Joi.object({
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

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            let validateData = createOfferSchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }

            let bodyData = req.body;

            console.log('bodyData-', bodyData);

            await new offers(bodyData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log("Offer Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating offers",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(create,'offerPage','image'));