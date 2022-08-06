const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import themes from "../../../database/schema/themes";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string(),
    displayOrder: Joi.string(),
});
import upload from "../../../middlewares/upload";

async function updateThemes(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        console.log(req.body);
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

        let bodyData = _.pick(req.body, [
            "_id",
            "name",
            "description",
            "metaTitle",
            "metaKeywords",
            "metaDescription",
            "displayOrder",
        ]);

        let setData = {
            name: bodyData.name,
            description: bodyData.description,
            metaTitle: bodyData.metaTitle,
            metaKeywords: bodyData.metaKeywords,
            metaDescription: bodyData.metaDescription,
            displayOrder: bodyData.displayOrder,
        };
        if (req.files.length > 0) {
            bodyData.image = req.files;
            setData["image"] = bodyData.image;
        }
        let updateModule = await themes.findOneAndUpdate(
            { _id: bodyData._id },
            { $set: setData }
        );
        console.log("updateModule is", updateModule);
        res.send({ status: true, message: "Themes Updated Successfully." });
    } catch (e) {
        console.log("saveModule err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in saveModule",
        });
    }
}
export default handler(upload(updateThemes, 'themes', 'image'));