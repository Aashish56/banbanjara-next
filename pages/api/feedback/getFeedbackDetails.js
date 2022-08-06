const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import feedback from '../../../database/schema/feedback';
import { handler } from '../../../middlewares/parser';

const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
 
const moduleSchema = Joi.object({
    _id: Joi.string().required(),
});

async function getFeedback(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }
        let bodyData = _.pick(req.body, ["_id"]);
        let findData = await feedback.findOne({ _id: bodyData._id }).lean();

        res.send({ status: true, message: "Feedback Found", data: findData });
    }
    catch (e) {
        console.log('Getting err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting" });
    }
}

export default handler(getFeedback);