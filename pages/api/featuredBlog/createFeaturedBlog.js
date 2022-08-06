import dbConnect from "../../../database/lib/dbConnect";
import featuredBlog from "../../../database/schema/featuredBlog";
import multiUpload from "../../../middlewares/multiUpload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createFeaturedBlogSchema = Joi.object({
    title: Joi.string().trim().required(),
    shortDescription: Joi.string().trim(),
    description: Joi.string().required(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string(),
    featuredBlogImage:Joi.any(),
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
        try {

            let validateData = createFeaturedBlogSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // pick data from req.body
            let featuredBlogFormData = _.pick(req.body, ['title', 'shortDescription', 'description', 'metaTitle', 'metaKeywords', 'metaDescription']);

            featuredBlogFormData.featuredBlogImage = req.files;
            let saveFeaturedBlog = await new featuredBlog(featuredBlogFormData).save();
            console.log('saveFeaturedBlog is ', saveFeaturedBlog)
            saveFeaturedBlog = saveFeaturedBlog.toObject();

            res.send({ status: true, message: "New FeaturedBlog created successfully" });
        }
        catch (e) {
            console.log('createFeaturedBlogHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Creating FeaturedBlog" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

const pageMedia = [
    {
      name: 'featuredBlogImage',
      maxCount: 3,
    },
    {
      name: 'bannerImage',
      maxCount: 3,
    },
  ];

export default handler(multiUpload(create,'featuredBlog',pageMedia));