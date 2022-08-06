import dbConnect from "../../../database/lib/dbConnect";
import offers from "../../../database/schema/offers";
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


const getOfferSchema = Joi.object({
    _id: Joi.string().trim().required(),
});

async function deleteOffer(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not deleteOfferowed" });
        }
        try {
            let validateData = getOfferSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let deleteData = await offers.remove({ _id: req.body._id });
            console.log("deleteData is", deleteData);
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "Offer Deleted Successfully" });
            } else {
                res.send({ status: true, message: "Offer not found" });
            }
        } catch (e) {
            console.log("Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in deletion",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteOffer);