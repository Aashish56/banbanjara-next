import feedback from '../../../database/schema/feedback';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')


 
const deleteSchema = Joi.object({
    _id: Joi.string().trim().required()
});

async function deleteFeedbackData(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        let validateData = deleteSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }


        // Getting Home from Database
        let deleteData = await feedback.remove({ _id: req.body._id });
        if (deleteData) {
            // if data found check verified or not
            res.send({ status: true, message: "Item Deleted Successfully." });
        } else {
            res.send({ status: false, message: "Item not found" });
        }
    }
    catch (e) {
        console.log('Getting list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting FeedbackDB Data" });
    }
}

export default handler(deleteFeedbackData);