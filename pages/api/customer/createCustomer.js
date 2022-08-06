import dbConnect from "../../../database/lib/dbConnect";
import customer from "../../../database/schema/customer";
import multiUpload from "../../../middlewares/multiUpload";
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

const createCustomerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    dateOfBirth: Joi.string().trim(),
    isMarried: Joi.boolean().required(),
    dateOfAnniversary: Joi.string().allow(null),
    email: Joi.string().email().trim().required(),
    mobile: Joi.number().required(),
    aadharNumber: Joi.number(),
    gender: Joi.string().trim(),
    alternativeMobile: Joi.number(),
    country: Joi.string().trim(),
    state: Joi.string().trim(),
    city: Joi.string().trim(),
    address: Joi.string().trim(),
    emergencyName: Joi.string().trim(),
    emergencyContact: Joi.number(),
    emergencyRelation: Joi.string().trim(),
    password: Joi.string().required(),
    about: Joi.string(),
});


async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createCustomerSchema.validate(req.body);
            if (validateData.error) {
                console.log(validateData.error);
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let customerData = _.pick(req.body, [
                'firstName',
                'lastName',
                'dateOfBirth',
                'isMarried',
                'dateOfAnniversary',
                'email',
                'mobile',
                'aadharNumber',
                'gender',
                'alternativeMobile',
                'country',
                'state',
                'city',
                'address',
                'emergencyName',
                'emergencyContact',
                'emergencyRelation',
            ]);

            // setting email to lowercase
            customerData.email = String(customerData.email).trim().toLowerCase();

            // searching email or mobile already exists or not
            let findData = await customer.findOne({
                $or: [{ email: customerData.email }, { mobile: customerData.mobile }],
            });
            if (findData) {
                // if not active, ie disabled by admin
                if (!findData.active) {
                    throw {
                        status: false,
                        error: true,
                        message: 'Your account has been disabled. Please contact admin',
                        adminDisable: true,
                        statusCode: 401,
                    };
                }

                throw {
                    status: false,
                    error: true,
                    message: 'Account already exists',
                    duplicateAccount: true,
                    statusCode: 401,
                };
            }

            // creating unique token
            let hash = await createTokenFunction(customerData.email);
            customerData.verificationToken = hash;
            let passwordText = nanoid(8);
            customerData.password = bcrypt.hashSync(passwordText, 10);
            console.log('req.files is', req.files);
            if (req.files.profileImage)
                customerData.profileImage = req.files.profileImage;
            if (req.files.aadharFrontImage)
                customerData.aadharFrontImage = req.files.aadharFrontImage;
            if (req.files.aadharBackImage)
                customerData.aadharBackImage = req.files.aadharBackImage;

            let saveCustomer = await new customer(customerData).save();
            saveCustomer = saveCustomer.toObject();
            saveCustomer.passwordText = passwordText;
            // now send mail
            let mailResponse = await prepareTemplateSendMail(saveCustomer);
            let mailSent = false;
            console.log('mailResponse is ', mailResponse);
            if (mailResponse.accepted.length) mailSent = true;
            res.send({
                status: true,
                message: 'Verification mail has been sent to registered email',
                mailSent,
            });
        } catch (e) {
            console.log('createCustomerHelper err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in SignUp',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

const ProfileMedia = [{
    name: 'profileImage'
}, {
    name: 'aadharFrontImage'
}, {
    name: 'aadharBackImage'
}];

export default handler(multiUpload(create, 'user', ProfileMedia));