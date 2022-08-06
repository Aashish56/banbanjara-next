import dbConnect from "../../../database/lib/dbConnect";
import country from "../../../database/schema/country";
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

const createCountrySchema = Joi.object({
    name: Joi.string().required(),
    iso: Joi.string().trim().required(),
    code: Joi.number().required(),
});



async function createCountry(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createCountrySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let countryData = _.pick(req.body, ["name", "iso", "code"]);

            // setting name to lowercase
            countryData.name = String(countryData.name).trim().toLowerCase();

            // searching email or mobile already exists or not
            let findData = await country.findOne({ name: countryData.name });
            if (findData) {
                // if not active, ie disabled by admin
                if (!findData.active) {
                    throw {
                        status: false,
                        error: true,
                        message:
                            "Country you are tring to add is already exists and it is disable please change status",
                        statusCode: 401,
                    };
                }
                throw {
                    status: false,
                    error: true,
                    message: "Country already exists",
                    statusCode: 401,
                };
            }

            // creating unique token
            let saveCountry = await new country(countryData).save();
            if (saveCountry)
                res.send({ status: true, error: false, message: "Country Added." });
            res.send({
                status: false,
                error: true,
                message: "Error while adding Country",
            });
        } catch (e) {
            console.log("create counrty err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "create counrty err",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(createCountry);