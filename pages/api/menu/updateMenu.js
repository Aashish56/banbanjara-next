const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import menuModule from "../../../database/schema/menuModule";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const menuModuleSchema = Joi.object({
    _id: Joi.objectId(),
    name: Joi.string().required(),
    status: Joi.boolean().required(),
    description: Joi.string().required(),
    updatedBy: Joi.objectId().required()
});

async function updateMenu(req, res) {
    try {
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = menuModuleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }


        let bodyData = _.pick(req.body, ['_id', 'name', 'description', 'status', 'updatedBy']);

        // searching email or mobile already exists or not
        let findData = await menuModule.findOne({ name: bodyData.name });
        if (findData) {
            // if data found check 
            throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateMenuModule: true, statusCode: 401 };
        }

        let updateMenuModule = await menuModule.findOneAndUpdate({ _id: bodyData._id }, { $set: bodyData });
        console.log('updateMenuModule is', updateMenuModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.DATA_UPDATE_SUCCESS });
    }
    catch (e) {
        console.log('updateMenuModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in updateMenuModule" });
    }
}
export default handler(updateMenu);