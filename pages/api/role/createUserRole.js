import userRole from '../../../database/schema/userRole';
import { handler } from '../../../middlewares/parser';

const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
 
const moduleSchema = Joi.object({
    id: Joi.string().allow(null),
    name: Joi.string().required(),
    rights: Joi.array().required(),
    createdBy: Joi.string().allow(null),
    updatedBy: Joi.string().allow(null)
});

async function createUserRole(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ['id', 'name', 'rights', 'createdBy', 'updatedBy']);
        let userRoleModule;
        if (bodyData.id != null) {
            let setData = {
                name: bodyData.name,
                rights: bodyData.rights,
                updatedBy: bodyData.updatedBy
            }
            userRoleModule = await userRole.findOneAndUpdate({ _id: bodyData.id }, { $set: setData }, { new: true }).lean();
            console.log(userRoleModule);
        }
        else {

            let findData = await userRole.findOne({ 'name': bodyData.name });
            if (findData) {
                // if data found check 
                throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateMenuModule: true, statusCode: 401 };
            }
            userRoleModule = await new userRole(bodyData).save();
            console.log('saveUserRoleModule is', userRoleModule)
        }

        res.send({ status: true, message: "", data: userRoleModule });
    }
    catch (e) {
        console.log('Getting menu list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Menu list" });
    }
}

export default handler(createUserRole);