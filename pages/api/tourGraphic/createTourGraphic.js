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

const createTourGraphicSchema = Joi.object({
    symbol: Joi.string(),
    text: Joi.string(),
    displayOrder: Joi.string()

})
async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createTourGraphicSchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let TourGraphicData = _.pick(req.body, [
                'text',
                'symbol',
                'displayOrder'
            ]);

            let saveTourGraphic = await new tourGraphic(TourGraphicData).save();

            res.send({
                status: true,
                message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
        } catch (e) {
            console.log('TourGraphicHelpor err', e);
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

export default handler(upload(create,'tourGraphic','image'));