import dbConnect from "../../../database/lib/dbConnect";
import tourCard from "../../../database/schema/destination";
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

const updateBlogStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.boolean().required(),
});

async function getDestination(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        try {
            if (req.query?.id) {
                let destinationRecord = await tourCard.findOne({ _id: req.query.id }).populate('featuredTag').populate('tourCards1').populate('tourCards2').exec();
                res.send({ status: true, error: false, message: "Destination Record Fetched.", data: destinationRecord });
            }
            let destinationRecords = await tourCard.find().populate('tourCards1').populate('tourCards2').exec();
            res.send({ status: true, error: false, message: "Destination Page Record Fetched", data: destinationRecords });
        } catch (error) {
            await errorResponseHelper({
                res,
                error,
                defaultMessage: "Destination page not added",
            });
        }
    }
    catch (e) {
        console.log('createBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }

};

export default handler(getDestination);



