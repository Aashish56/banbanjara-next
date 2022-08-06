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

const updateThingsToKnowSchema = Joi.object({
    _id: Joi.string().required(),
    title: Joi.string(),
    subTitle: Joi.string(),
    symbol: Joi.string(),
    displayOrder: Joi.string(),
  });

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            // validate data using joi
            let validateData = updateThingsToKnowSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let ThingsToKnowData = _.pick(req.body, [
                "_id",
                "title",
                "subTitle",
                "symbol",
                "displayOrder",
            ]);

            setData = {
                title: ThingsToKnowData.title,
                subTitle: ThingsToKnowData.subTitle,
                symbol: ThingsToKnowData.symbol,
                displayOrder: ThingsToKnowData.displayOrder,
            };

            await thingsToKnow.findOneAndUpdate(
                { _id: ThingsToKnowData._id },
                { $set: setData }
            );
            res.send({
                status: true,
                message: "Things to Know Updated Successfully.",
            });
        } catch (e) {
            console.log("updateThingsToKnow err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in ThingsToKnow Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update,'thingsToknow','image'));