import travelWith from "../../../database/schema/travelWith";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    metaKeywords: Joi.string(),
    displayOrder: Joi.string(),
});

async function createTravelWith(req, res) {
    try {
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }

        // pick data from req.body
        let bodyData = _.pick(req.body, [
            "name",
            "description",
            "metaTitle",
            "metaKeywords",
            "metaDescription",
            "displayOrder",
        ]);

        if (req.files?.length > 0) bodyData.image = req.files;

        let saveModule = await new travelWith(bodyData).save();
        console.log("saveModule is", saveModule);
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
export default handler(upload(createTravelWith,'travelWith','image'));
