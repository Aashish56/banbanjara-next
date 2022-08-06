import feedback from '../../../database/schema/feedback';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const schema = Joi.object({
    _id: Joi.string().required(),
    status: Joi.boolean().required()
});


async function update(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        let bodyData = _.pick(req.body, ["status", "_id"]);
        let setData = {
            status: bodyData.status,

        }
        let updateModule = await feedback.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
    }
    catch (e) {
        console.log('updateModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in updateModule" });
    }
}

export default handler(update);