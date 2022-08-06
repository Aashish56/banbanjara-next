const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import slider from '../../../database/schema/slider';
import { handler } from '../../../middlewares/parser';
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const schema = Joi.object({
    _id: Joi.string().required(),
});

async function deleteSider(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }


        // Getting Slider from Database
        let deleteData = await slider.remove({ _id: req.body._id });
        console.log('deleteData is', deleteData)
        if (deleteData) {
            // if data found check verified or not
            res.send({ status: true, message: "Slider Deleted Successfully" });
        } else {
            res.send({ status: true, message: "Slider not found" });
        }


    }
    catch (e) {
        console.log('createSliderHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }
}
export default handler(deleteSider);