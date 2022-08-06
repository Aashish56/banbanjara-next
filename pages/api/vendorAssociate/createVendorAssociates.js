import dbConnect from "../../../database/lib/dbConnect";
import vendorAssociate from "../../../database/schema/vendorAssociate";
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

const createVendorAssociateSchema = Joi.object({
    vendorId: Joi.string().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    mobile: Joi.string().trim(),
    secondaryMobile: Joi.number().allow(''),
    email: Joi.string().email().trim(),
    designation: Joi.string().allow(null),
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
            console.log(req.body?.firstName, 'body')
            let validateData = createVendorAssociateSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: "Invalid data" };
            }
      
            // pick data from req.body
            let vendorData = _.pick(req.body, [
              "vendorId",
              "firstName",
              "lastName",
              "mobile",
              "secondaryMobile",
              "email",
              "designation",
              // "vendorId",
            ]);
      
            // setting email to lowercase
            vendorData.email = String(vendorData.email).trim().toLowerCase();
      
            // searching email or mobile already exists or not
            let findData = await vendorAssociate.findOne({
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
            //   if (req.files.aadharFrontImage)
            //     vendorData.aadharFrontImage = req.files.aadharFrontImage;
            //   if (req.files.aadharBackImage)
            //     vendorData.aadharBackImage = req.files.aadharBackImage;
      
            let saveVendorAssociate = await new vendorAssociate(vendorData).save();
            saveVendorAssociate = saveVendorAssociate.toObject();
            res.send({ status: true, error: false, message: "VendorAssociate Added." });
            //   saveVendorAssociate.passwordText = passwordText;
            // now send mail
            //   let mailResponse = await prepareTemplateSendMail(saveVendorAssociate);
            //   let mailSent = false;
            //   console.log("mailResponse is ", mailResponse);
            //   if (mailResponse.accepted.length) mailSent = true;
            //   res.send({
            //     status: true,
            //     message: "Verification mail has been sent to registered email",
            //     mailSent,
            //   });
          } catch (e) {
            console.log("createVendorAssociateHelper err", e);
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

export default handler(create);