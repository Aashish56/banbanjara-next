import dbConnect from "../../../database/lib/dbConnect";
import offerPage from "../../../database/schema/offerPage";
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


const getOfferPageSchema = Joi.object({
    _id: Joi.string().trim().required(),
});


async function getall(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            let findData = await offerPage.find().sort({ $natural: -1 }).limit(1); // Sort by newset and get the fisrt latest record

            if (findData) {
                // if data found check verified or not
                res.send({ status: true, message: "Offer Page Data", data: findData });
            } else {
                res.send({ status: true, message: "Offer Page Data not found" });
            }
        } catch (e) {
            console.log(" err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getting Offer Page",
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getall);