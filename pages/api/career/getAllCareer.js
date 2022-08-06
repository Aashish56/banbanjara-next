import dbConnect from "../../../database/lib/dbConnect";
import career from "../../../database/schema/career";
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



async function getAllCareer(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // Getting all Careers from Database
            let findData = await career.find().sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "Careers List", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for Careers" });
            }
        }
        catch (e) {
            console.log('getAllCareerHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(getAllCareer);