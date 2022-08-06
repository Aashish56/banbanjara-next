import dbConnect from "../../../database/lib/dbConnect";
import itinerary from "../../../database/schema/faq";
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

const updateFaqSchema = Joi.object({
    _id: Joi.string().required(),
    tourId:Joi.string(),
    answer:Joi.string(),
    question:Joi.string(),
    displayOrder:Joi.string()

})

async function update(req, res) {

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
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateFaqSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: 'Invalid data' };
            }
      
            // pick data from req.body
            let FaqData = _.pick(req.body, [
                '_id',
                'tourId',
                'answer',
                'question',
              'displayOrder'
            ]);
            setData = {
    
              'tourId':FaqData.tourId,
                'answer':FaqData.answer,
                'question':FaqData.question,
              'displayOrder':FaqData.displayOrder
              // text: FaqData.text,
              // symbol: FaqData.symbol,
              // displayOrder: FaqData.displayOrder,
    
            };
            let updateModule = await itinerary.findOneAndUpdate(
              { _id: FaqData._id },
              { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
              status: true,
              message: 'Quick Fact Updated Successfully.',
            });
          } catch (e) {
            console.log('updateFaq err', e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: 'Error in Faq Update',
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(update,'Faq','image'));