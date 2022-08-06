const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const taxes = "../../../database/schema/taxes";
const moduleSchema = Joi.object({
    taxValue: Joi.number().required(),
});

async function createTaxes(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, ["taxValue"]);

        if (req.files?.length > 0) bodyData.image = req.files;

        await new taxes(bodyData).save();
        res.send({
            status: true,
            message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
        });
    } catch (e) {
        console.log("save Module err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in saveModule",
        });
    }
}
export default handler(upload(createTaxes,'taxes','image'));
