import dbConnect from "../../../database/lib/dbConnect";
import user from "../../../database/schema/user";
import pImage from "../../../database/schema/pImage";
import pFeatures from "../../../database/schema/pFeatures";
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

const updateUserStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.number().required(),
});


async function updateUserStatus(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            let validateData = updateUserStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let bodyData = _.pick(req.body, ["active", "_id"]);
            let setData = {
                active: bodyData.active,
            }
            let updateModule = await user.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });

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

export default handler(updateUserStatus);