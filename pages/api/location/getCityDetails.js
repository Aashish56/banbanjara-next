import dbConnect from "../../../database/lib/dbConnect";
import city from "../../../database/schema/city";
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

const getCitySchema = Joi.object({
    _id: Joi.objectId().required(),
  });

async function getCityDetails(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = getCitySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // Getting City from Database
            let findData = await city.findOne({ _id: req.body._id });
            console.log("findData is", findData);
            if (findData) {
                // if data found check verified or not
                res.send({ status: true, message: "City Data", data: findData });
            } else {
                res.send({ status: true, message: "City Data not found" });
            }
        } catch (e) {
            console.log("createCityHelper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getCityDetails",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getCityDetails);