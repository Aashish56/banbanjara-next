
import dbConnect from "../../../database/lib/dbConnect";
import landingPage from "../../../database/schema/landing";
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

const createItinerarySchema = Joi.object({
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()

})



async function getLanding(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            if (req.query?.id) {
                const landRecord = await landingPage.findOne({ _id: req.query.id }).populate('featuredTag').populate('tourCards1').populate('tourCards2').exec();
                res.send({ status: true, error: false, message: "Landing Record Fetched.", data: landRecord });
            }
            const landRecords = await landingPage.find().populate('featuredTag').populate('tourCards1').populate('tourCards2').exec();
            res.send({ status: true, error: false, message: "Landing Page Record Fetched", data: landRecords });
        } catch (error) {
            console.log(error);
            await errorResponseHelper({
                res,
                error,
                defaultMessage: "Landing page not fetched",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getLanding);
