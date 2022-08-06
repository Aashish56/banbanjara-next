import dbConnect from "../../../database/lib/dbConnect";
import itinerary from "../../../database/schema/faq";
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

const deleteFaqSchema = Joi.object({
    _id: Joi.string().required(),
    tourId:Joi.string(),

})

async function get(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            let validateData = getFaqSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: 'Invalid data' };
            }
      
            let findData = await itinerary.findOne({ _id: req.body._id });
            console.log('findData is', findData);
            if (findData) {
              // if data found check verified or not
              res.send({ status: true, message: 'Quick Fact Data', data: findData });
            } else {
              res.send({ status: true, message: 'Quick Fact Data not found' });
            }
          } catch (e) {
            console.log(' err', e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: 'Error in getting quick fact',
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(get);