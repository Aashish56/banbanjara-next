import dbConnect from "../../../database/lib/dbConnect";
import thingsToKnow from "../../../database/schema/thingsToKnow";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createThingsToKnowSchema = Joi.object({
    title: Joi.string(),
    subTitle: Joi.string(),
    symbol: Joi.string(),
    displayOrder: Joi.string(),
  });
async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            // validate data using joi
            let validateData = createThingsToKnowSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let ThingsToKnowData = _.pick(req.body, [
                "title",
                "subTitle",
                "symbol",
                "displayOrder",
            ]);

            await new thingsToKnow(ThingsToKnowData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log("ThingsToKnowHelpor err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating quick fact",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create,'thingsToknow','image'));