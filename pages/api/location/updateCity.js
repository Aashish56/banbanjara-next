import dbConnect from "../../../database/lib/dbConnect";
import city from "../../../database/schema/city";
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

const updateCitySchema = Joi.object({
    _id: Joi.objectId().required(),
    countryId: Joi.string().required(),
    stateId: Joi.string().required(),
    name: Joi.string().trim().required(),
});

async function updateCity(req, res) {
    await dbConnect();
    try {
        try {
            let validateData = updateCitySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // pick data from req.body
            let cityData = _.pick(req.body, ["_id", "countryId", "stateId", "name"]);
            setData = {
                countryId: cityData.countryId,
                stateId: cityData.stateId,
                name: cityData.name.trim().toLowerCase(),
            };
            let updateModule = await city.findOneAndUpdate(
                { _id: cityData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({ status: true, message: "City Updated Successfully." });
        } catch (e) {
            console.log("updateCity err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in city Update",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updateCity);