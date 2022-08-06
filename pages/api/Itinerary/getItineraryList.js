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

const createItinerarySchema = Joi.object({
    tourId:Joi.string(),
    title:Joi.string(),
    displayOrder:Joi.string(),
    description:Joi.string()

})



async function getItinerary(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // if(!req.body.tourId){
            //   throw 'N'
            // }
            let findData = await itineraries.find({tourId:req.body.tourId}).sort('displayOrder');
            if (findData.length) {
              // if data found check verified or not
              res.send({ status: true, message: 'Intinerary List', data: findData });
            } else {
              res.send({ status: true, message: 'No Data found for Intinerary' });
            }
          } catch (e) {
            console.log(' err', e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: 'Error in getting Intinerary',
            });
          }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getItinerary);