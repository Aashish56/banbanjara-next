import dbConnect from "../../../database/lib/dbConnect";
import user from "../../../database/schema/user";
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

async function getAllUser(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }

        try {
            // Getting all Users from Database
            let findData = await user.find().sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: "Users List", data: findData });
            } else {
                res.send({ status: true, message: "No Data found for Users" });
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

export default handler(getAllUser);