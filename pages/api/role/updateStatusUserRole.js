const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import userRole from '../../../database/schema/userRole';
import { handler } from '../../../middlewares/parser';
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
 
const moduleSchema = Joi.object({
    id: Joi.string().required(),
    status: Joi.boolean().required(),
    updatedBy: Joi.string().required()
});

async function updateUserRole(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ['id', 'status', 'updatedBy']);
        let setData = {
            status: bodyData.status,
            updatedBy: bodyData.updatedBy
        }
        let userRoleModule = await userRole.findOneAndUpdate({ _id: bodyData.id }, { $set: setData }, { new: true }).lean();

        res.send({ status: true, message: "", data: userRoleModule });
    }
    catch (e) {
        console.log('Getting menu list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Menu list" });
    }
}

export default handler(updateUserRole);