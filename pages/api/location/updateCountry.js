import dbConnect from "../../../database/lib/dbConnect";
import counrty from "../../../database/schema/counrty";
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

const updateCountrySchema = Joi.object({
    _id: Joi.objectId().required(),
    name: Joi.string().trim().required(),
    iso: Joi.string().trim().required(),
    code: Joi.number().required(),
});

async function updateCountry(req, res) {
    await dbConnect();
    try {
        try {
            let validateData = updateCountrySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let countryData = _.pick(req.body, ["_id", "name", "iso", "code"]);
            setData = {
                name: countryData.name.trim().toLowerCase(),
                iso: countryData.iso,
                code: countryData.code,
            };
            let updateModule = await counrty.findOneAndUpdate(
                { _id: countryData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({ status: true, message: "Country Updated Successfully." });
        } catch (e) {
            console.log("updateCountry err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in country Update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updateCountry);