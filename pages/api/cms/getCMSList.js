const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import cms from "../../../database/schema/cms";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')

 

const moduleSchema = Joi.object({
    keyWord: Joi.string().empty(""),
    pageNo: Joi.number().integer().min(1),
    size: Joi.number().integer().min(1),
});

async function getCMSList(req, res) {
    try {
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
        }
        let bodyData = _.pick(req.body, ["keyWord", "pageNo", "size"]);
        let query = {};
        if (bodyData.keyWord && bodyData.keyWord !== '') {
            query = { 'name': { '$regex': bodyData.keyWord, '$options': 'i' } };
        }
        let findData = await cms.find(query).skip(bodyData.size * (bodyData.pageNo - 1))
            .limit(bodyData.size).sort({ _id: -1 })
        let obj = {
            total: findData.length,
            list: findData
        }
        res.send({ status: true, message: "", data: obj });
    }
    catch (e) {
        console.log('Getting list err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting list" });
    }
}

export default handler(getCMSList);