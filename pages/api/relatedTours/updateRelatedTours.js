const _ = require('lodash');
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
import upload from "../../../middlewares/upload";
const schema = Joi.object({
    tourId: Joi.string().required,
});

async function updateRelatedTours(req, res) {
    try {
        // validate data using joi
        // let validateData = moduleSchema.validate(req.body);
        // if (validateData.error) {
        //   throw {
        //     status: false,
        //     error: validateData,
        //     message: CONSTANTSMESSAGE.INVALID_DATA,
        //   };
        // }
        console.log(req.body, 'body');
        // pick data from req.body
        let bodyData = _.pick(req.body, ['tourId', 'relatedTours']);

        let setData = {
            relatedTours: bodyData.relatedTours,
        };

        // const relatedTours =

        let updateModule = await tours.findOneAndUpdate(
            { _id: bodyData.tourId },
            { $set: setData },
            { new: true }
        );

        console.log('updateModule is', updateModule);
        res.send({ status: true, message: 'Related Tours Updated Successfully.' });
    } catch (e) {
        console.log('saveModule err', e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: 'Error in update Module',
        });
    }
}

export default handler(upload(updateRelatedTours,'relatedTour','image'));
