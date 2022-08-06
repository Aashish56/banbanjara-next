import slider from '../../../database/schema/slider';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import upload from "../../../middlewares/upload";
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    metaKeywords: Joi.string(),
});

async function createSlider(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ["name", "description", "metaTitle", "metaKeywords", "metaDescription"]);

        let findData = await slider.findOne({ name: bodyData.name });

        if (findData) {
            // if data found check 
            throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
        }

        if (req.files.length > 0)
            bodyData.image = req.files;

        let saveModule = await new slider(bodyData).save();
        console.log('saveModule is', saveModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}

export default handler(upload(createSlider,'slider','image'));