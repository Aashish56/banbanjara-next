import dbConnect from "../../../database/lib/dbConnect";
import policies from "../../../database/schema/policies";
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

const updatePoliciesSchema = Joi.object({
    _id: Joi.string().required(),
    symbol: Joi.string().required(),
    text: Joi.string().required(),
    displayOrder: Joi.string(),
    description: Joi.string(),
  });

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // validate data using joi
            let validateData = updatePoliciesSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // pick data from req.body
            let PoliciesData = _.pick(req.body, [
                "_id",
                "text",
                "symbol",
                "displayOrder",
                "description",
            ]);
            console.log("PoliciesData", PoliciesData);

            setData = {
                text: PoliciesData.text,
                symbol: PoliciesData.symbol,
                displayOrder: PoliciesData.displayOrder,
                description: PoliciesData.description,
            };
            let updateModule = await policies.findOneAndUpdate(
                { _id: PoliciesData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Policies Updated Successfully.",
            });
        } catch (e) {
            console.log("updatePolicies err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Policies Update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update,'policies','image'));