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

const getStateSchema = Joi.object({
    _id: Joi.objectId().required(),
});

async function deleteSate(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = getStateSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // Getting State from Database
            let deleteData = await state.remove({ _id: req.body._id });
            console.log("deleteData is", deleteData);
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "State Deleted Successfully" });
            } else {
                res.send({ status: true, message: "State not found" });
            }
        } catch (e) {
            console.log("createStateHelper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in deleteState",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteSate);