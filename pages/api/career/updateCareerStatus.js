import dbConnect from "../../../database/lib/dbConnect";
import career from "../../../database/schema/career";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const sendSupplierMailHelper = require('../../../Helper/sendSupplierMailHelper');
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateCareerStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.boolean().required(),
});


async function updatCareerStatus(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = updateCareerStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            let bodyData = _.pick(req.body, ["active", "_id"]);
            let setData = {
                active: bodyData.active,
            }
            let updateModule = await Models.CareerDB.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS });
        }
        catch (e) {
            console.log('createCareerHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updatCareerStatus);