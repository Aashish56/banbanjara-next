const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const taxes = "../../../database/schema/taxes";
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
    _id: Joi.string().required(),
    taxValue: Joi.number().required(),
});
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
async function update(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // validate data using joi
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }

        // pick data from req.body

        let bodyData = _.pick(req.body, ["_id", "taxValue"]);

        let setData = {
            taxValue: bodyData.taxValue,
        };
        if (req.files.length > 0) {
            bodyData.image = req.files;
            setData["image"] = bodyData.image;
        }
        let updateModule = await taxes.findOneAndUpdate(
            { _id: bodyData._id },
            { $set: setData }
        );
        console.log("updateModule is", updateModule);
        res.send({ status: true, message: "Taxes Updated Successfully." });
    } catch (e) {
        console.log("saveModule err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in saveModule",
        });
    }
}
export default handler(upload(updateTaxes, 'taxes', 'image'));

