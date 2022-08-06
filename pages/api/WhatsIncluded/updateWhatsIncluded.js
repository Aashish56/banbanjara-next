import dbConnect from "../../../database/lib/dbConnect";
import whatsIncluded from "../../../database/schema/whatsIncluded";
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

const updateWhatsIncludedSchema = Joi.object({
    _id: Joi.string().required(),
    symbol: Joi.string().required(),
    text: Joi.string().required(),
    displayOrder: Joi.string(),
});

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateWhatsIncludedSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let WhatsIncludedData = _.pick(req.body, [
                "_id",
                "text",
                "symbol",
                "displayOrder",
            ]);
            setData = {
                text: WhatsIncludedData.text,
                symbol: WhatsIncludedData.symbol,
                displayOrder: WhatsIncludedData.displayOrder,
            };
            let updateModule = await whatsIncluded.findOneAndUpdate(
                { _id: WhatsIncludedData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Quick Fact Updated Successfully.",
            });
        } catch (e) {
            console.log("updateWhatsIncluded err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in WhatsIncluded Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};
export default handler(upload(update, 'WhatsIncluded', 'image'));
