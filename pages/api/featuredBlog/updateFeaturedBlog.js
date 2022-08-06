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

const updateFeaturedBlogSchema = Joi.object({
    _id: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    shortDescription: Joi.string().trim(),
    description: Joi.string().required(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string(),
    image: Joi.any(),
});

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {

            let validateData = updateFeaturedBlogSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body

            let bodyData = _.pick(req.body, ['title', 'shortDescription', 'description', 'metaTitle', 'metaKeywords', 'metaDescription']);


            let setData = {
                title: bodyData.title,
                shortDescription: bodyData.shortDescription,
                description: bodyData.description,
                metaTitle: bodyData.metaTitle,
                metaKeywords: bodyData.metaKeywords,
                metaDescription: bodyData.metaDescription
            }
            let FeaturedBlogMedia = req.files;
            setData['featuredBlogImage'] = FeaturedBlogMedia.featuredBlogImage;
            setData['bannerImage'] = FeaturedBlogMedia.bannerImage;

            let updateModule = await featuredBlog.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: 'FeaturedBlog updated Successfully' });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in updating FeaturedBlog post" });
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

export default handler(multiUpload(update, 'featuredBlog', pageMedia));