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

const getCountrySchema = Joi.object({
    _id: Joi.objectId().required(),
});

async function getStateDetails(req, res) {

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
            let findData = await state.findOne({ _id: req.body._id });
            console.log("findData is", findData);
            if (findData) {
                // if data found check verified or not
                res.send({ status: true, message: "State Data", data: findData });
            } else {
                res.send({ status: true, message: "State Data not found" });
            }
        } catch (e) {
            console.log("createStateHelper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getStateDetails",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getStateDetails);