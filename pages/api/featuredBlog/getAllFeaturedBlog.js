import dbConnect from "../../../database/lib/dbConnect";
import featuredBlog from "../../../database/schema/featuredBlog";
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

const getFeaturedBlogSchema = Joi.object({
    _id: Joi.string().trim().required()
});

async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // Getting all FeaturedBlogs from Database
            let findData = await featuredBlog.find().sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "FeaturedBlogs List", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for FeaturedBlogs" });
            }
        }
        catch (e) {
            console.log('createFeaturedBlogHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(getAll);