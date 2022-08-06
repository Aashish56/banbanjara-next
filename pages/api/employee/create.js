import feedback from '../../../database/schema/feedback';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)


 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required(),
    rating: Joi.number().required(),
    propertyId: Joi.string().allow('null'),
    message: Joi.string().required()
});

async function create(req, res) {
    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body

        let bodyData = _.pick(req.body, ["name", "rating", "city", "propertyId", "message"]);
        // searching email or mobile already exists or not
        // let findData = await Models.FeedbackDB.findOne({ email: bodyData.email });
        // if (findData) {
        //     // if data found check 
        //     throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateModule: true, statusCode: 401 };
        // }
        bodyData.image = req.files;
        let saveModule = await new feedback(bodyData).save();
        console.log('saveModule is', saveModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveModule" });
    }
}
export default handler(create);