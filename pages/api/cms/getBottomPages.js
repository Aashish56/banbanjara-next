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

 

async function getCMSPages(req, res) {
    try {
        let findData = await cms.find({ position: type }).lean();
        res.send({ status: true, message: "CMS " + type + " Pages.", data: findData });
    }
    catch (e) {
        console.log('Getting Pages err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting Pages" });
    }
}

export default handler(getCMSPages);