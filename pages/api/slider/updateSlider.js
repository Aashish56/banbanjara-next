const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
import upload from "../../../middlewares/upload";
import slider from '../../../database/schema/slider';
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string()
});

async function updateSlider(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body

        let bodyData = _.pick(req.body, ["_id", "name", "description", "metaTitle", "metaKeywords", "metaDescription"]);

        let setData = {
            name: bodyData.name,
            description: bodyData.description,
            metaTitle: bodyData.metaTitle,
            metaKeywords: bodyData.metaKeywords,
            metaDescription: bodyData.metaDescription
        }
        if (req.files.length > 0) {
            bodyData.image = req.files;
            setData['image'] = bodyData.image
        }
        let updateModule = await slider.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: "Slider Updated Successfully." });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}
export default handler(upload(updateSlider, 'slider', 'image'));
