import dbConnect from "../../../database/lib/dbConnect";
import user from "../../../database/schema/user";
import pImage from "../../../database/schema/pImage";
import pFeatures from "../../../database/schema/pFeatures";
import upload from "../../../middlewares/upload";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateUserSchema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    address: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
});

async function updateUser(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateUserSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let userData = _.pick(req.body, ['id', 'firstName', 'lastName', 'address', 'city', 'state']);
            setData = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                address: userData.address,
                city: userData.city,
                state: userData.state,
            }
            let updateModule = await user.findOneAndUpdate({ _id: userData.id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: 'User Profile Updated Successfully.' });
        }
        catch (e) {
            console.log('updateUser err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in user Update" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(updateUser,'user','image'))