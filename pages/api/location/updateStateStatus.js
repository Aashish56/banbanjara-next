import dbConnect from "../../../database/lib/dbConnect";
import state from "../../../database/schema/state";
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
const updateStateStatusSchema = Joi.object({
    _id: Joi.objectId().required(),
    active: Joi.boolean().required(),
});

async function updateStateStatus(req, res) {
    await dbConnect();
    try {
        try {
            let validateData = updateStateStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let bodyData = _.pick(req.body, ["active", "_id"]);
            let setData = {
                active: bodyData.active,
            };
            let updateModule = await Models.StateDB.findOneAndUpdate(
                { _id: bodyData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                error: false,
                message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
            });
        } catch (e) {
            console.log("createStateHelper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in updateStateStatus",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updateStateStatus);