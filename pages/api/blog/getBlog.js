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

// const allDestination = Joi.object({
//     title: Joi.string(),
//     coverImage: Joi.string(),
//     country: Joi.string(),
//     state: Joi.string(),
//     city: Joi.string(),
// });


const getBlogSchema = Joi.object({
    _id: Joi.string().trim().required()
});

async function getAll(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        let validateData = getBlogSchema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }

        try {
            // Getting all Blogs from Database
            let findData = await blog.find().sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "Blogs List", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for Blogs" });
            }


        }
        catch (e) {
            console.log('createBlogHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    }
    catch (e) {
        console.log('createBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }


};

export default handler(getAll);



