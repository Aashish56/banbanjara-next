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

const createCitySchema = Joi.object({
    countryId: Joi.string().required(),
    stateId: Joi.string().required(),
    name: Joi.string().trim().required(),
});



async function createCity(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createCitySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let cityData = _.pick(req.body, ["countryId", "stateId", "name"]);

            // setting name to lowercase
            cityData.name = String(cityData.name).trim().toLowerCase();

            // searching email or mobile already exists or not
            let findData = await city.findOne({ name: cityData.name });
            if (findData) {
                // if not active, ie disabled by admin
                if (!findData.active) {
                    throw {
                        status: false,
                        error: true,
                        message:
                            "City you are tring to add is already exists and it is disable please change status",
                        statusCode: 401,
                    };
                }
                throw {
                    status: false,
                    error: true,
                    message: "City already exists",
                    statusCode: 401,
                };
            }
            // creating unique token
            let saveCity = await new city(cityData).save();
            if (saveCity)
                res.send({ status: true, error: false, message: "City Added." });
            res.send({
                status: false,
                error: true,
                message: "Error while adding City",
            });
        } catch (e) {
            console.log("create city err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "create city err",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(createCity);