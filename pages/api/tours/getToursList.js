const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
// const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");

async function getToursList(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        let findData = await tours.find({}).sort({ _id: -1 }).select('-relatedTours');
        let obj = {
            total: findData.length,
            list: findData,
        };
        res.send({ status: true, message: "", data: obj });
    } catch (e) {
        console.log("Getting list err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in Getting list",
        });
    }
}

export default handler(getToursList);
