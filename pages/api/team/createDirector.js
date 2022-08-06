import team from '../../../database/schema/team';
import { handler } from '../../../middlewares/parser';
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    designation: Joi.string(),
    shortDescription: Joi.string(),
    description: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
    instagram: Joi.string(),
    linkedin: Joi.string(),
});


async function createTeam(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ["name", "designation", "shortDescription", "description", "facebook", "twitter", "instagram", "linkedin"]);
        bodyData.isDirector = Director;
        let findData = await team.findOne({ name: bodyData.name });

        if (findData) {
            // if data found check 
            throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
        }

        if (req.files.length > 0)
            bodyData.image = req.files;

        let saveModule = await new team(bodyData).save();
        console.log('saveModule is', saveModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}

export default handler(upload(createTeam,'team','image'));