import dbConnect from "../../../database/lib/dbConnect";
import user from "../../../database/schema/user";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createTokenFunction = require('../../../Helper/createUniqueToken');
const prepareTemplateAndMailHelper = require('../../../Helper/prepareTemplateAndMail');

async function prepareTemplateSendMail(data) {
    try {
        let filePath = path.join(__dirname, '/../../../Template/userAuthenticationWithPassword.html');
        let replacements = {
            name: `${_.capitalize(data.firstName)} ${data.lastName}`,
            username: data.email,
            password: data.passwordText,
            authenticationLink: `${process.env.SERVER_URL || process.env.APP_URL}/verification?token=${data.verificationToken}`
        }
        let info = await prepareTemplateAndMailHelper({ filePath, replacements, to: data.email, subject: "Authentication" });
        return info;
    }
    catch (e) {
        console.log('error', e);
    }
}

const createUserSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    email: Joi.string().email().trim().required(),
    mobile: Joi.number().required(),
    country: Joi.string(),
    userRole: Joi.string().required()
});

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createUserSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let userData = _.pick(req.body, ['firstName', 'lastName', 'email', 'mobile', 'country', 'userRole']);

            // setting email to lowercase
            userData.email = String(userData.email).trim().toLowerCase();

            // searching email or mobile already exists or not
            let findData = await user.findOne({ $or: [{ email: userData.email }, { mobile: userData.mobile }] });
            if (findData) {
                // if data found check verified or not
                if (!findData.verified) {
                    // user is not verified then send verification email again
                    prepareTemplateSendMail(findData);
                    throw { status: false, error: true, message: "Please verify your account", notVerified: true, mailSent: true, statusCode: 401 };
                }
                // if not active, ie disabled by admin
                if (!findData.active) {
                    throw { status: false, error: true, message: "Your account has been disabled. Please contact admin", adminDisable: true, statusCode: 401 };
                }

                throw { status: false, error: true, message: "Account already exists", duplicateAccount: true, statusCode: 401 };
            }

            // creating unique token
            let hash = await createTokenFunction(userData.email);
            userData.verificationToken = hash;
            let passwordText = nanoid(8);
            userData.password = bcrypt.hashSync(passwordText, 10);
            if (req.files.length > 0)
                userData.image = req.files;

            let saveUser = await new user(userData).save();
            saveUser = saveUser.toObject();
            saveUser.passwordText = passwordText;
            // now send mail 
            prepareTemplateSendMail(saveUser);

            res.send({ status: true, message: "Verification mail has been sent to your registered email", mailSent: true });
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

export default handler(upload(create,'user','image'));