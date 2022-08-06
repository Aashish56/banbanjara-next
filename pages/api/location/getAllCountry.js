import dbConnect from "../../../database/lib/dbConnect";
import counrty from "../../../database/schema/counrty";
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


async function getAllCountry(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // Getting all Country from Database
            let findData = await counrty.find().sort({ name: -1 });
            if (findData.length) {
              // if data found check verified or not
              res.send({
                status: true,
                error: false,
                message: "Country List",
                data: findData,
              });
            } else {
              res.send({
                status: true,
                error: false,
                message: "No Data found for Country",
              });
            }
          } catch (e) {
            console.log("createCountryHelper err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in getAllCountry",
            });
          }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAllCountry);