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
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const jobApplicationSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    mobile: Joi.number().required(),
    qualification: Joi.string().required(),
    careerID: Joi.string().trim().required(),
    email: Joi.string().required(),
    message: Joi.string()
});

async function sendJobApplicationToMail(data, Models) {
    try {
        let filePath = path.join(__dirname, '/../../../Template/jobApplication.html');
        let careerData = await Models.CareerDB.findOne({ _id: data.careerID }).lean();
        let replacements = {
            name: `${_.capitalize(data.firstName)}` +' '+ `${_.capitalize(data.lastName)}`,
            qualification: `${_.capitalize(data.qualification)}`,
            appliedFor: careerData.degination,
            mobile: data.mobile,
            email: data.email,
            message: data.message
        }
        console.log('careerData is ', careerData)
        let attachments = [];
        let apiUrl = 'https://api.vishalconstructioncompany.com/'
        for (let x = 0; x < data.resume.length; x++){
            let item = data.resume[x]
            let obj = {};
            obj.path = apiUrl + item.path ;
            attachments. push(obj);
        }
        //let info = await prepareTemplateAndMailHelper({ filePath, replacements, to: data.email, subject: "New Supplier Request For VCC" });
        let info = await sendSupplierMailHelper({ filePath, replacements, to: "info@vishalconstructioncompany.com", subject: "New Job Application for VCC", attachments, from: data.email });
        return info;
    }
    catch (e) {
        console.log('error', e);
    }
}

async function applyForJob(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let validateData = jobApplicationSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }
            let jobFormData = _.pick(req.body, ['firstName', 'lastName', 'qualification', 'careerID', 'email', 'mobile', 'message']);
            jobFormData.resume = req.files;
            let saveJob = await new career(jobFormData).save();
            saveJob = saveJob.toObject();
            await sendJobApplicationToMail(saveJob, Models);
            res.send({ status: true, message: "Applied successfully.!" });
        }
        catch (e) {
            console.log('createCareerHelper err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error While Applying to Job" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(applyForJob,'jobApplication','resume'));