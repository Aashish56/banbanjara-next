import team from '../../../database/schema/team';
import { handler } from '../../../middlewares/parser';
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    designation: Joi.string(),
    shortDescription: Joi.string(),
    description: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
    instagram: Joi.string(),
    linkedin: Joi.string(),
});

async function updateTeam(req, res) {
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

        let bodyData = _.pick(req.body, ["_id", "name", "designation", "shortDescription", "description", "facebook", "twitter", "instagram", "linkedin"]);

        let setData = {
            name: bodyData.name,
            designation: bodyData.designation,
            shortDescription: bodyData.shortDescription,
            description: bodyData.description,
            facebook: bodyData.facebook,
            twitter: bodyData.twitter,
            instagram: bodyData.instagram,
            linkedin: bodyData.linkedin
        }
        if (req.files.length > 0) {
            bodyData.image = req.files;
            setData['image'] = bodyData.image
        }
        let updateModule = await team.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: "Team Member Updated Successfully." });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}
export default handler(upload(updateTeam, 'team', 'image'));