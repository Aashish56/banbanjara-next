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

 

async function getContactUsList(req, res) {
    try {
        let findData = await contactus.find({}).sort({ _id: -1 });
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

export default handler(getContactUsList);