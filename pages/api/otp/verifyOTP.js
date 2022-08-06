import otp from '../../../database/schema/otp';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    mobile: Joi.number().required(),
    otp: Joi.number().required()
});

async function verifyOTP(req, res) {
    try {

        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ['mobile', 'otp']);
        let query = {
            $and: [
                { 'mobile': bodyData.mobile },
                { 'otp': bodyData.otp },
                { 'isExpired': false },
            ]
        }
        let findData = await otp.findOne(query);
        if (findData) {
            res.send({ status: true, message: 'Verified.' });
        } else {
            res.send({ status: false, message: 'Invalid OTP Please Try Again.' });
        }
    }
    catch (e) {
        console.log('OTP err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Verifing OTP" });
    }
}

export default handler(verifyOTP);