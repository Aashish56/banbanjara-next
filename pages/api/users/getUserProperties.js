import dbConnect from "../../../database/lib/dbConnect";
import property from "../../../database/schema/property";
import pImage from "../../../database/schema/pImage";
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

const getUserPropertySchema = Joi.object({
    userId: Joi.string().trim().required()
});

async function getUserProperties(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }

        try {
            let validateData = getUserPropertySchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }


            // Getting User from Database
            let Data = await property.find({ userId: req.body.userId }).sort({ _id: -1 });
            console.log('Data is', Data)
            if (Data) {
                // if data found check verified or not
                res.send({ status: true, message: "User Properties List", data: Data });
            } else {
                res.send({ status: true, message: "User Properties not found" });
            }


        }
        catch (e) {
            console.log('createUserHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getUserProperties);