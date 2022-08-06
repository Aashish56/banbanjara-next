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

const updateStateSchema = Joi.object({
    _id: Joi.objectId().required(),
    countryId: Joi.string().required(),
    name: Joi.string().trim().required(),
});

async function updateState(req, res) {
    await dbConnect();
    try {
        try {
            let validateData = updateStateSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // pick data from req.body
            let stateData = _.pick(req.body, ["_id", "countryId", "name"]);
            setData = {
                name: stateData.name.trim().toLowerCase(),
                countryId: stateData.countryId,
            };
            let updateModule = await state.findOneAndUpdate(
                { _id: stateData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({ status: true, message: "State Updated Successfully." });
        } catch (e) {
            console.log("updateState err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in state Update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updateState);