const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import feedback from '../../../database/schema/feedback';
import { handler } from '../../../middlewares/parser';

 

async function getFeedbackForHomeModule(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        let query = {};
        query = { status: true };
        let findData = await feedback.find(query).sort({ _id: -1 }).populate("propertyId");
        if (findData.length) {
            res.send({ status: true, message: "Client Feedbacks", data: findData });
        } else {
            res.send({ status: true, message: "No Active Feedbacks Feedbacks", data: findData });
        }

    }
    catch (e) {
        console.log('Getting list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting list" });
    }
}

export default handler(getFeedbackForHomeModule);