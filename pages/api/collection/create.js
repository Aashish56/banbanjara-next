import dbConnect from "../../../database/lib/dbConnect";
import collection from "../../../database/schema/collection";
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
import multiUpload from "../../../middlewares/multiUpload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const createBlogSchema = Joi.object({
    title: Joi.string().trim().required(),
    shortDescription: Joi.string().trim(),
    description: Joi.string().required(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string(),
    blogImage: Joi.any(),
    // time:
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // let validateData = createCollectionSchema.validate(req.body);
            // if (validateData.error) {
            //   throw {
            //     status: false,
            //     error: validateData,
            //     message: CONSTANTSMESSAGE.INVALID_DATA,
            //   };
            // }

            let bodyData = req.body;

            console.log("bodyData-", bodyData);

            await new collection(bodyData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log("Collection Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in creating tag page",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

const pageMedia = [{
    name: 'image', maxCount: 1
}, {
    name: 'cardImage', maxCount: 1
}];

export default handler(multiUpload(create,'collection',pageMedia));