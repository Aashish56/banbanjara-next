import dbConnect from "../../../database/lib/dbConnect";
import tourGraphic from "../../../database/schema/tourGraphic";
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

const updateTourGraphicSchema = Joi.object({
    _id: Joi.string().required(),
    symbol: Joi.string().required(),
    text: Joi.string().required(),
    displayOrder: Joi.string()

})

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateTourGraphicSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let TourGraphicData = _.pick(req.body, [
                '_id',
                'text',
                'symbol',
                'displayOrder'
            ]);
            setData = {
                text: TourGraphicData.text,
                symbol: TourGraphicData.symbol,
                displayOrder: TourGraphicData.displayOrder,
            };
            let updateModule = await tourGraphic.findOneAndUpdate(
                { _id: TourGraphicData._id },
                { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
                status: true,
                message: 'Quick Fact Updated Successfully.',
            });
        } catch (e) {
            console.log('updateTourGraphic err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in TourGraphic Update',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update, 'tourGraphic', 'image'));