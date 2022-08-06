import dbConnect from "../../../database/lib/dbConnect";
import newsLetterSubscribers from "../../../database/schema/newsLetterSubscribers";
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

const createNewsLetterSchema = Joi.object({
    email: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
});

async function deleteNewsletter(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // let validateData = getNewsLetterSchema.validate(req.body);
            // if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            // }


            // Getting NewsLetter from Database
            let deleteData = await newsLetterSubscribers.remove({ _id: req.body._id });
            console.log('deleteData is', deleteData)
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "NewsLetter Deleted Successfully" });
            } else {
                res.send({ status: true, message: "NewsLetter not found" });
            }


        }
        catch (e) {
            console.log('deleteNewsletter err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteNewsletter);