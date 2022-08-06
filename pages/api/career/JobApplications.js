import dbConnect from "../../../database/lib/dbConnect";
import jobApplication from "../../../database/schema/jobApplication";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const sendSupplierMailHelper = require('../../../Helper/sendSupplierMailHelper');
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateJobApplicationSchema = Joi.object({
    _id: Joi.string().trim().required(),
    status: Joi.number().required(),
});


async function getAllData(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // Getting all Careers from Database
            let findData = await jobApplication.find().populate('careerID').sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "Application List", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for Careers" });
            }
        }
        catch (e) {
            console.log('createCareerHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in getting data" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(getAllData);