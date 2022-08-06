const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import menuModule from "../../../database/schema/menuModule";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const menuModuleSchema = Joi.object({
    userRole: Joi.array().required()
});

async function getMenuList(req, res) {
    try {
        let validateData = menuModuleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ['userRole']);
        let findData = await menuModule.find({ 'name': { $in: bodyData.userRole } });
        res.send({ status: true, message: "", data: findData });
    }
    catch (e) {
        console.log('Getting menu list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Menu list" });
    }
}

export default handler(getMenuList);