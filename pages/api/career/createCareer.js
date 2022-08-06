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

const createCareerSchema = Joi.object({
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


async function createCareer(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {

            let validateData = createCareerSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            // pick data from req.body
            let careerFormData = _.pick(req.body, ['degination', 'department', 'vacancy', 'experiance', 'location', 'desctiption', 'metaTitle', 'metaKeywords', 'metaDescription']);

            let saveCareer = await career(careerFormData).save();
            saveCareer = saveCareer.toObject();

            res.send({ status: true, message: "New Job post created successfully" });
        }
        catch (e) {
            console.log('createCareerHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Creating job post" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(createCareer);