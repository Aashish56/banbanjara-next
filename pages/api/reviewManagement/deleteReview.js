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

const createReviewSchema = Joi.object({
    user: Joi.string().required(),
    description: Joi.string().required(),
    tour: Joi.string().required(),
    image: Joi.string().required(),
    order: Joi.string().required(),
    stars: Joi.string().required(),
});

async function deleteReview(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            await reviewManagement.deleteOne({ _id: req.body._id });
            res.send({ status: true, message: "Review Deleted Successfully" });
            // console.log('get review data  --------------------> ', reviewData);
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

export default handler(deleteReview);