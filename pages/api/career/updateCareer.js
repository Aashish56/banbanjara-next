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

const updateCareerSchema = Joi.object({
    _id: Joi.objectId().trim().required(),
    degination: Joi.string().trim().required(),
    department: Joi.string().trim(),
    vacancy: Joi.number().required(),
    experiance: Joi.string().required(),
    location: Joi.string().required(),
    desctiption: Joi.string().required(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string()
});


async function updatCareer(req, res) {
    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {

            let validateData = updateCareerSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: CONSTANTSMESSAGE.INVALID_DATA };
            }

            // pick data from req.body

            let bodyData = _.pick(req.body, ["_id", 'degination', 'department', 'vacancy', 'experiance', 'location', 'desctiption', 'metaTitle', 'metaKeywords', 'metaDescription']);
            console.log('bodyData is', bodyData)
            let setData = {
                degination: bodyData.degination,
                department: bodyData.department,
                vacancy: bodyData.vacancy,
                experiance: bodyData.experiance,
                location: bodyData.location,
                desctiption: bodyData.desctiption,
                metaTitle: bodyData.metaTitle,
                metaKeywords: bodyData.metaKeywords,
                metaDescription: bodyData.metaDescription
            }

            let updateModule = await career.findOneAndUpdate({ _id: bodyData._id }, { $set: setData });
            console.log('updateModule is', updateModule)
            res.send({ status: true, message: 'Job Post updated Successfully' });
        }
        catch (e) {
            console.log('saveModule err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in updating Career post" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(updatCareer);