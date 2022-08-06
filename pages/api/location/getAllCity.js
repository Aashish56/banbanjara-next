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


async function getAllCity(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // Getting all City from Database
            let findData = await city.find().sort({ name: -1 });
            if (findData.length) {
              // if data found check verified or not
              res.send({
                status: true,
                error: false,
                message: "City List",
                data: findData,
              });
            } else {
              res.send({
                status: true,
                error: false,
                message: "No Data found for City",
              });
            }
          } catch (e) {
            console.log("CityHelper err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in City",
            });
          }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAllCity);