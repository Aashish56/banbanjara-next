import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage');
const review = '../../../database/schema/review';
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    propertyId: Joi.string().required()
});

async function createReviewRequest(req, res) {
    try {
        // validate data using joi
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ["name", "email", "rating", "comment", "propertyId"]);
        // searching email or mobile already exists or not
        let findData = await review.findOne({ $and: [{ email: bodyData.email }, { propertyId: bodyData.propertyId }] });
        if (findData) {
            // if data found check 
            throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
        }

        let saveModule = await new review(bodyData).save();
        console.log('saveModule is', saveModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}

export default handler(createReviewRequest);