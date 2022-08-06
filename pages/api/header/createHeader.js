import dbConnect from "../../../database/lib/dbConnect";
import header from "../../../database/schema/header";
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

const moduleSchema = Joi.object({
    title: Joi.string().required(),
    order: Joi.number().required(),
    link: Joi.string().trim().required(),
});


async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = moduleSchema.validate(req.body);
            if (validateData.error) {
                throw {
                    status: false,
                    error: validateData,
                    message: CONSTANTSMESSAGE.INVALID_DATA,
                };
            }

            let bodyData = req.body;

            console.log(bodyData);

            await new header(bodyData).save();
            // console.log("saveModule is", saveModule);
            res.send({
                status: true,
                message: "Header Created Successfully.",
            });
        } catch (e) {
            console.log("save Module err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in saveModule",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);