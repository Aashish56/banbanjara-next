import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../database/schema/attractionPage";
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

async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            // Getting all Vendors from Database
            let findData = await attraction.find();
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "ALL Destination Data Fetched", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for All Destination ", data: null });
            }
        } catch (e) {
            console.log("createAttraction err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getting Attraction list",
            });
        }


    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);
