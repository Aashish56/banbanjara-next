import dbConnect from "../../../database/lib/dbConnect";
import itineraries from "../../../database/schema/itinerary";
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

const updateItinerarySchema = Joi.object({
    _id: Joi.string().required(),
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()
})




async function updateItinerary(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateItinerarySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let itineraryData = _.pick(req.body, [
                '_id',
                'tourId',
                'title',
                'displayOrder',
                'description',
            ]);
            setData = {
                tourId: itineraryData.tourId,
                title: itineraryData.title,
                displayOrder: itineraryData.displayOrder,
                description: itineraryData.description

            };
            let updateModule = await itineraries.findOneAndUpdate(
                { _id: itineraryData._id },
                { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
                status: true,
                message: 'Quick Fact Updated Successfully.',
            });
        } catch (e) {
            console.log('updateItinerary err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in Itinerary Update',
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(updateItinerary, 'Itinerary', 'image'));