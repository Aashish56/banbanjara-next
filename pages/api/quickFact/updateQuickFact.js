import dbConnect from "../../../database/lib/dbConnect";
import quickFact from "../../../database/schema/quickFact";
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

const updateQuickFactSchema = Joi.object({
    _id: Joi.string().required(),
    symbol: Joi.string().required(),
    text: Joi.string().required(),
    displayOrder: Joi.string()

})

async function updateQuickFact(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateQuickFactSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let quickFactData = _.pick(req.body, [
                '_id',
                'text',
                'symbol',
                'displayOrder'
            ]);
            setData = {
                text: quickFactData.text,
                symbol: quickFactData.symbol,
                displayOrder: quickFactData.displayOrder,

            };
            let updateModule = await quickFact.findOneAndUpdate(
                { _id: quickFactData._id },
                { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
                status: true,
                message: 'Quick Fact Updated Successfully.',
            });
        } catch (e) {
            console.log('updateQuickFact err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in quickFact Update',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(updateQuickFact, 'quickFact', 'image'));