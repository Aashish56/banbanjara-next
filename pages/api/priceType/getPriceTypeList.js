const _ = require('lodash');
const Joi = require('joi');

Joi.objectId = require('joi-objectid')(Joi)
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import priceType from "../../../database/schema/priceType";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 

async function getPriceTypeList(req, res) {
    try {
        let findData = await priceType.find({}).sort({ _id: -1 });
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

export default handler(getPriceTypeList);