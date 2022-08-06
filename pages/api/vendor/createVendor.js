import dbConnect from "../../../database/lib/dbConnect";
import vendor from "../../../database/schema/vendor";
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

const createVendorSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    companyName: Joi.string().trim().required(),
    country: Joi.string().trim(),
    state: Joi.string().trim(),
    city: Joi.string().trim(),

    email: Joi.string().email().trim().required(),
    secondaryAddress: Joi.string().allow(''),
    mobile: Joi.string().required(),
    secondaryMobile: Joi.string().allow(''),
    designation: Joi.string().allow(null),
    profileImage: Joi.any(),
    bankName: Joi.string().trim().allow(''),
    bankAccountHolderName: Joi.string().trim().allow(''),
    bankAccountNumber: Joi.string().trim().allow(''),
    bankBranchName: Joi.string().trim().allow(''),
    bankIFSCode: Joi.string().trim().allow(''),
    iban: Joi.string().trim().allow(''),
    swiftCode: Joi.string().trim().allow(''),
    pan: Joi.string().trim().allow(''),
    serviceTaxNumber: Joi.string().trim().allow(''),
    paymentTerms: Joi.string().trim().allow(''),
    operationCountry: Joi.string().trim().allow(''),
    operationState: Joi.string().trim().allow(''),
    operationCity: Joi.string().trim().allow(''),
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
            let validateData = createVendorSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let vendorData = _.pick(req.body, [
                "firstName",
                "lastName",
                "companyName",
                "country",
                "state",
                "city",
                "email",
                "secondaryAddress",
                "mobile",
                "secondaryMobile",
                "designation",
                "bankName",
                "bankAccountHolderName",
                "bankAccountNumber",
                "bankBranchName",
                "bankIFSCode",
                "iban",
                "swiftCode",
                "pan",
                "serviceTaxNumber",
                "paymentTerms",
                "operationCountry",
                "operationState",
                "operationCity",
            ]);

            // setting email to lowercase
            vendorData.email = String(vendorData.email).trim().toLowerCase();
            vendorData.bankAccountNumber = Number(vendorData.bankAccountNumber) || null;

            // searching email or mobile already exists or not
            let findData = await vendor.findOne({
                $or: [{ email: vendorData.email }, { mobile: vendorData.mobile }],
            });
            if (findData) {
                // if not active, ie disabled by admin
                if (!findData.active) {
                    throw {
                        status: false,
                        error: true,
                        message: "Your account has been disabled. Please contact admin",
                        adminDisable: true,
                        statusCode: 401,
                    };
                }

                throw {
                    status: false,
                    error: true,
                    message: "Account already exists",
                    duplicateAccount: true,
                    statusCode: 401,
                };
            }

            // creating unique token
            //   let hash = await createTokenFunction(vendorData.email);
            //   vendorData.verificationToken = hash;
            //   let passwordText = nanoid(8);
            //   vendorData.password = bcrypt.hashSync(passwordText, 10);
            console.log("req.files is", req.files);
            if (req.files.profileImage)
                vendorData.profileImage = req.files.profileImage;
            //   if (req.files.aadharFrontImage)
            //     vendorData.aadharFrontImage = req.files.aadharFrontImage;
            //   if (req.files.aadharBackImage)
            //     vendorData.aadharBackImage = req.files.aadharBackImage;

            let saveVendor = await new vendor(vendorData).save();
            saveVendor = saveVendor.toObject();
            res.send({ status: true, error: false, message: "Vendor Added." });
            //   saveVendor.passwordText = passwordText;
            // now send mail
            //   let mailResponse = await prepareTemplateSendMail(saveVendor);
            //   let mailSent = false;
            //   console.log("mailResponse is ", mailResponse);
            //   if (mailResponse.accepted.length) mailSent = true;
            //   res.send({
            //     status: true,
            //     message: "Verification mail has been sent to registered email",
            //     mailSent,
            //   });
        } catch (e) {
            console.log("createVendorHelper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in SignUp",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create, 'profileImage', 'image'));