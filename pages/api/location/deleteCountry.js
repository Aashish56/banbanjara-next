import dbConnect from "../../../database/lib/dbConnect";
import counrty from "../../../database/schema/country";
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

const getCountrySchema = Joi.object({
    _id: Joi.objectId().required(),
  });


async function deleteCity(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = getCountrySchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: "Invalid data" };
            }
      
            // Getting Country from Database
            let deleteData = await counrty.remove({ _id: req.body._id });
            console.log("deleteData is", deleteData);
            if (deleteData) {
              // if data found check verified or not
              res.send({ status: true, message: "Country Deleted Successfully" });
            } else {
              res.send({ status: true, message: "Country not found" });
            }
          } catch (e) {
            console.log("createCountryHelper err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in deleteCountry",
            });
          }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteCity);