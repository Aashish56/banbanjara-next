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

const createFaqSchema = Joi.object({
    tourId:Joi.string(),
    answer:Joi.string(),
    question:Joi.string(),
    displayOrder:Joi.string(),
})

async function create(req, res) {

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
            let validateData = createFaqSchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let FaqData = _.pick(req.body, [
                'tourId',
                'answer',
                'question',
                'displayOrder'
            ]);

            let saveFaq = await new itinerary(FaqData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log('FaqHelpor err', e);
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

export default handler(upload(create,'Faq','image'));