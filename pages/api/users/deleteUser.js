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

const getUserSchema = Joi.object({
    _id: Joi.string().trim().required()
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            let validateData = getUserSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // Getting User from Database
            let deleteData = await user.remove({ _id: req.body._id });
            console.log('deleteData is', deleteData)
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "User Deleted Successfully" });
            } else {
                res.send({ status: true, message: "User not found" });
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

export default handler(create);