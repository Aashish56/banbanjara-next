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
const schema = Joi.object({
    id: Joi.string().required(),
    status: Joi.boolean().required(),
});

async function updateStatus(req, res) {
    try {
        // console.log(req.sessionID)
        // validate data using joi
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        let bodyData = _.pick(req.body, ["status", "id"]);
        let setData = {
            status: bodyData.status,
        }
        let updateModule = await menuModule.findOneAndUpdate({ _id: bodyData.id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
    }
    catch (e) {
        console.log('updateModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in updateModule" });
    }
}
export default handler(updateStatus);