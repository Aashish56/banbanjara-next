import productEnquiries from "../../../database/schema/productEnquiries";
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
    product: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    description: Joi.string(),
    phone: Joi.string(),
    location: Joi.string(),
    totalPeople: Joi.string().required(),
    date: Joi.string().required(),
    metaTitle: Joi.string(),
    metaDescription: Joi.string(),
    metaKeywords: Joi.string(),
});

async function createProductEnquiries(req, res) {
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

        let saveModule = await new productEnquiries(bodyData).save();
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

export default handler(upload(createProductEnquiries,'productEnquiries','image'));
