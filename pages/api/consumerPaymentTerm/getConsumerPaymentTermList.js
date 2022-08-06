const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import consumerPaymentTerm from "../../../database/schema/consumerPaymentTerm";
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

async function getConsumerPaymentTerm(req, res) {
    try {
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }
        // Getting Travel With from Database
        let ConsumerPaymentTermData = await consumerPaymentTerm.findOne({ _id: req.body._id });
        console.log('Travel With is', ConsumerPaymentTermData)
        if (ConsumerPaymentTermData) {
            // if data found check verified or not
            res.send({ status: true, message: "Travel With Details", data: ConsumerPaymentTermData });
        } else {
            res.send({ status: true, message: "Travel With not found" });
        }
    }
    catch (e) {
        console.log('ConsumerPaymentTermData err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in ConsumerPaymentTermData" });
    }
}
export default handler(getConsumerPaymentTerm);