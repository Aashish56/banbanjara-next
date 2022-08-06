import dbConnect from "../../../database/lib/dbConnect";
import thingsToKnow from "../../../database/schema/thingsToKnow";
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

const getThingsToKnowStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    isDisable: Joi.boolean().required(),
});

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            // validate data using joi
            let validateData = getThingsToKnowStatusSchema.validate(req.body);
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
            let updateModule = await thingsToKnow.findOneAndUpdate(
                { _id: bodyData._id },
                { $set: setData }
            );
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

export default handler(update);