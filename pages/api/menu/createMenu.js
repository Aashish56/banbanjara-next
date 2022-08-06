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
  
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage');
const menuModuleSchema = Joi.object({
    name: Joi.string().required(),
    parent: Joi.string(),
    grandParent: Joi.string(),
    description: Joi.string().required(),
    //createdBy: Joi.objectId().required()
});

async function createMenu(req, res) {
    try {
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = menuModuleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body

        let bodyData = _.pick(req.body, ['name', 'parent', 'grandParent', 'description', 'createdBy']);

        // searching email or mobile already exists or not
        let findData = await menuModule.findOne({ name: bodyData.name });
        if (findData) {
            // if data found check 
            throw { status: false, error: true, message: CONSTANTSMESSAGE.ALREADY_EXIST, duplicateMenuModule: true, statusCode: 401 };
        }

        let saveMenuModule = await new menuModule(bodyData).save();
        console.log('saveMenuModule is', saveMenuModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE });
    }
    catch (e) {
        console.log('saveMenuModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in saveMenuModule" });
    }
}
export default handler(createMenu);