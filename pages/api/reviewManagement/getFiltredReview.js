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

async function getAllFiltered(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            const destinationResponseHandler = async (data, field) => {
                const reviewData = await reviewManagement.find().populate('tour');
                const filtredReview = []
                data.forEach(el => {
                    reviewData.forEach((review) => {
                        if (el._id.toString() === review.tour._id.toString()) {
                            filtredReview.push(review)
                        }
                    })
                })
                res.send({
                    status: true,
                    message: `Filtred Reviews fetched Sucessfully`,
                    data: filtredReview,
                    // reviewData
                    // tourData,
                    // data
                });
            }
            if (req.body.city) {
                const data = await tours.find({ 'city.name': req.body.city.name });
                destinationResponseHandler(data, 'city')
                return
            }
            if (req.body.state) {
                const data = await tours.find({ 'state.name': req.body.state.name });
                destinationResponseHandler(data, 'state')
                return
            }
            if (req.body.country) {
                const data = await tours.find({ 'city.name': req.body.country.name });
                destinationResponseHandler(data, 'country')
                return
            } else {
                res.send({
                    status: false,
                    message: 'No Data Found for Tours ',
                    data: null
                });
            }

        } catch (e) {
            console.log("updateModule err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error while fetching Related Links Data",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAllFiltered);