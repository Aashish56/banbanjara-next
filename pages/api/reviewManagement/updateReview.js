import dbConnect from "../../../database/lib/dbConnect";
import reviewManagement from "../../../../database/schema/reviewManagement";
import tours from "../../../database/schema/tours";
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

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            console.log('this is the request Body ------------> ', req.body);
            let bodyData = _.pick(req.body, [
                'user',
                'description',
                'tour',
                'image',
                'order',
                'stars'
            ]);
            bodyData.tour = mongoose.Types.ObjectId(bodyData.tour)
            let updateModule = await reviewManagement.findOneAndUpdate({ _id: req.body._id }, { $set: bodyData });
            // let updateModule = await reviewManagement.findOneAndUpdate({ _id: req.body._id }, { $set: setData });
            console.log('Updated Module ', updateModule);
            res.send({ status: true, message: "Review Updated Successfully", data: updateModule });
            // console.log('get review data  --------------------> ', reviewData);
        } catch (e) {
            console.log('this is the request Body ------------> ', req.body);
            console.log('error While updating review res -----------> ', e)
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

export default handler(update);