import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const otpGenerator = require('otp-generator');
const SendMessage = require('../../../Helper/sendSms');
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage');
const otp = '../../../database/schema/otp';
const moduleSchema = Joi.object({
    mobile: Joi.number().required()
});

async function createOTP(req, res) {
    try {

        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ['mobile']);
        let OTP = Math.floor(100000 + Math.random() * 900000);
        let ExpireAllOTP = await otp.updateMany({ mobile: bodyData.mobile },
            { $set: { "isExpired": true } });
        let dataToSave = {
            mobile: bodyData.mobile,
            otp: OTP
        }
        let saveModule = await new otp(dataToSave).save();
        if (saveModule) {
            let message = 'Hello VCCUSER, \n';
            message += 'OTP for Vishal Construction Company is : ' + OTP;
            message += ' Thanks. VISHCC';
            console.log('message is', message);
            let msgObj = {
                senderID: 'VCCFLT',
                templateID: '1207163549200843594',
                mobile: bodyData.mobile,
                message: message,
            };
            let smsResult = await SendMessage(msgObj);
            console.log('smsResult', smsResult)
        }
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('OTP err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Sending OTP" });
    }
}
export default handler(createOTP);