import dbConnect from "../../../database/lib/dbConnect";
import itineraries from "../../../database/schema/itinerary";
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

const createItinerarySchema = Joi.object({
    tourId:Joi.string(),
    title:Joi.string(),
    displayOrder:Joi.string(),
    description:Joi.string()

})



async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createItinerarySchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let itineraryData = _.pick(req.body, [
                'tourId',
                'title',
                'description',
                'displayOrder'
            ]);

            let saveItinerary = await new itineraries(itineraryData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log('ItineraryHelpor err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in creating quick fact',
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create, 'Itinerary', 'image'));