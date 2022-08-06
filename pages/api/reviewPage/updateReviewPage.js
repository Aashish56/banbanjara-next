import dbConnect from "../../../database/lib/dbConnect";
import review from "../../../database/schema/review";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let bodyData = _.pick(req.body, [
                'title',
                'description',
                'file',
                'type',
                'cards',
            ]);
            let reviewData = await review.findOneAndUpdate({ _id: req.body._id }, { $set: bodyData });
            console.log('savedModule --------------------> ', reviewData);
            res.send({
                status: true,
                data: reviewData,
                message: 'Review Page Updated Suncessfully'
            });
        } catch (e) {
            console.log('error While getting res -----------> ', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error while updating Review Data",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update, 'homepage', 'image'));