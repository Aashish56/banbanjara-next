import dbConnect from "../../../database/lib/dbConnect";
import tagPage from "../../../database/schema/tagPage";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const _ = require('lodash');
import upload from "../../../middlewares/upload";
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const updateTagPageSchema = Joi.object({
    _id: Joi.string().required(),
    country: Joi.object(),
    state: Joi.object(),
    city: Joi.object(),
    title: Joi.string(),
    tours: Joi.array(),
    category: Joi.object().empty(""),
    // tag: Joi.string().required(),
    metaTitle: Joi.string(),
    metaKeyword: Joi.string(),
    metaDescription: Joi.string(),
    description: Joi.string(),
    image: Joi.string(),
    cardImage: Joi.string(),
    promotionalBar: Joi.array()
});
async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateTagPageSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let TagPageData = _.pick(req.body, [
                "_id",
                "country",
                "state",
                "city",
                "title",
                "tag",
                "makeAsCategory",
                "metaTitle",
                "metaKeyword",
                "metaDescription",
                "description",
                "image",
                "cardImage",
                "promotionalBar"
            ]);

            setData = {
                country: TagPageData.country,
                state: TagPageData.state,
                city: TagPageData.city,
                title: TagPageData.title,
                tag: TagPageData.tag,
                makeAsCategory: TagPageData.makeAsCategory,
                metaTitle: TagPageData.metaTitle,
                metaKeyword: TagPageData.metaKeyword,
                metaDescription: TagPageData.metaDescription,
                image: TagPageData.image,
                cardImage: TagPageData.cardImage,
                description: TagPageData.description,
                promotionalBar: TagPageData.promotionalBar,
            };
            let updateModule = await tagPage.findOneAndUpdate({ _id: TagPageData._id }, { $set: setData });
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "TagPage Updated Successfully.",
            });
        } catch (e) {
            console.log("updateTagPage err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Tag Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(update, 'tagPage', 'image'));