import dbConnect from "../../../database/lib/dbConnect";
import blog from "../../../database/schema/blog";
import multiUpload from "../../../middlewares/multiUpload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        console.log('this is create req boidys ------------>', req.body);
        try {

            let validateData = createBlogSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let blogFormData = _.pick(req.body, ['title', 'shortDescription', 'description', 'metaTitle', 'metaKeywords', 'metaDescription']);

            blogFormData.blogImage = req.files;
            let saveBlog = await new blog(blogFormData).save();
            console.log('saveBlog is ', saveBlog)
            saveBlog = saveBlog.toObject();

            res.send({ status: true, message: "New Blog created successfully" });
        }
        catch (e) {
            console.log('createBlogHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Creating Blog" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


}

const pageMedia = [{
    name: 'blogImage', maxCount: 3
}, {
    name: 'bannerImage', maxCount: 3
}];

export default handler(multiUpload(create,'blog',pageMedia));