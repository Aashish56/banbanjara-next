import dbConnect from "../../../database/lib/dbConnect";
import blog from "../../../database/schema/blog";
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

const getBlogSchema = Joi.object({
    _id: Joi.string().trim().required()
});

async function deleteCollectionFunc(req, res) {
    try {
        await dbConnect();
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = getBlogSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }


            // Getting Blog from Database
            let deleteData = await blog.remove({ _id: req.body._id });
            console.log('deleteData is', deleteData)
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "Blog Deleted Successfully" });
            } else {
                res.send({ status: true, message: "Blog not found" });
            }


        }
        catch (e) {
            console.log('createBlogHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
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

export default handler(deleteCollectionFunc)