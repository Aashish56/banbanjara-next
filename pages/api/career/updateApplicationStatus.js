import dbConnect from "../../../database/lib/dbConnect";
import jobApplication from "../../../database/schema/jobApplication";
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

const updateJobApplicationSchema = Joi.object({
    _id: Joi.string().trim().required(),
    status: Joi.number().required(),
});


async function updatStatus(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = updateJobApplicationSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            let bodyData = _.pick(req.body, ["status", "_id"]);
            let setData = {
                status: bodyData.status,
            }
            let updateModule = await jobApplication.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
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

export default handler(updatStatus);