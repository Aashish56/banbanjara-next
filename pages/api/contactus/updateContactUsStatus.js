const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import contactus from "../../../database/schema/contactus";
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
    isResolved: Joi.boolean().required()
});

async function updateCotactUsStatus(req, res) {
    try {
        // validate data using joi
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }

        let bodyData = _.pick(req.body, ["isResolved", "id"]);
        let setData = {
            isResolved: bodyData.isResolved,
        }
        let updateModule = await contactus.findOneAndUpdate({ _id: bodyData.id }, { $set: setData });
        console.log('updateModule is', updateModule)
        res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
    }
    catch (e) {
        console.log('updateModule err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in updateModule" });
    }
}
export default handler(updateCotactUsStatus);