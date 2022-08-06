import dbConnect from "../../../database/lib/dbConnect";
import reviewManagement from "../../../../database/schema/reviewManagement";
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

async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            let reviewData = await reviewManagement.find().populate('tour');
            // console.log('get review data  --------------------> ', reviewData);
            res.send({
                status: true,
                data: reviewData
            });
        } catch (e) {
            console.log('error While getting res -----------> ', e)
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error while getting Review Management Data",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);