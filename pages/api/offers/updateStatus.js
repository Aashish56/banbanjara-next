import dbConnect from "../../../database/lib/dbConnect";
import offers from "../../../database/schema/offers";
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

const getOfferStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    isDisable: Joi.boolean().required(),
});


async function updateStatusOffer(req, res) {

    await dbConnect();
    try {
        try {
            // validate data using joi
            let validateData = getOfferStatusSchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }
            let bodyData = _.pick(req.body, ["isDisable", "_id"]);
            let setData = {
                isDisable: bodyData.isDisable,
            };
            let updateModule = await offers.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
            });
        } catch (e) {
            console.log("updateModule err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in updateModule",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(updateStatusOffer);