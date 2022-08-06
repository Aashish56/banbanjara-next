const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import productEnquiries from "../../../database/schema/productEnquiries";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const schema = Joi.object({
    _id: Joi.string().required(),
});

async function getProductEnquiries(req, res) {
    try {
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }


        // Getting Travel With from Database
        let ProductEnquiriesData = await productEnquiries.findOne({ _id: req.body._id });
        console.log('Travel With is', ProductEnquiriesData)
        if (ProductEnquiriesData) {
            // if data found check verified or not
            res.send({ status: true, message: "Travel With Details", data: ProductEnquiriesData });
        } else {
            res.send({ status: true, message: "Travel With not found" });
        }


    }
    catch (e) {
        console.log('ProductEnquiriesData err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in ProductEnquiriesData" });
    }
}
export default handler(getProductEnquiries);