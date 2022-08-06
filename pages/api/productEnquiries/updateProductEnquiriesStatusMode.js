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
    status: Joi.string().required(),
    comment: Joi.string(),
});

async function updateProductEnquiriesStatusMode(req, res) {

    try {
        // validate data using joi
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        let bodyData = _.pick(req.body, ["comment", "status", "_id"]);

        let setData = {
            status: bodyData.status,
            comment: bodyData.comment
        }
        let updateModule = await productEnquiries.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
    }
    catch (e) {
        console.log('updateModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in updateModule" });
    }
}

export default handler(updateProductEnquiriesStatusMode);