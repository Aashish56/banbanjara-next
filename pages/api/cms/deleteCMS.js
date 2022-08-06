const _ = require('lodash');
const Joi = require('joi');
import cms from "../../../database/schema/cms";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')

 
const { required } = require('joi');

const moduleSchema = Joi.object({
    _id: Joi.string().required(),
});


async function Delete(req, res) {
    try {
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }
        let bodyData = _.pick(req.body, ["_id"]);
        let _id = bodyData._id;
        let findData = await cms.remove({ _id }).lean();
        res.send({ status: true, message: "CMS Deleted.", data: findData });
    }
    catch (e) {
        console.log('Getting Delete err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Delete Details" });
    }
}


export default handler(Delete);