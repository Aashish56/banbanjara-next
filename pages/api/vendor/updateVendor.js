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

const updateVendorSchema = Joi.object({
    _id: Joi.string().required(),
    active:Joi.boolean(),
    accountno:Joi.string(),
    isVerified:Joi.boolean(),
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    companyName: Joi.string().trim(),
    country: Joi.string().trim(),
    state: Joi.string().trim(),
    city: Joi.string().trim(),
    profileImage: Joi.any(),
    email: Joi.string().email().trim(),
    secondaryAddress: Joi.string().allow(''),
    mobile: Joi.string().required(),
    secondaryMobile: Joi.string().allow(''),
    designation: Joi.string().allow(null),
    bankName: Joi.string().trim().allow(''),
    bankAccountHolderName: Joi.string().trim().allow(''),
    bankAccountNumber: Joi.string().trim().allow(null),
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
    isEmailVerified: Joi.boolean(),
    isMobileVerified: Joi.boolean(),
    vendorCreationDate: Joi.date(),
    updated: Joi.date(),
    onBoardActive:Joi.boolean(),
  
  });

async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateVendorSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let vendorData = _.pick(req.body, [
                "_id",
                "firstName",
                "lastName",
                "address",
                "city",
                "state",
                "profileImage"
            ]);
            setData = {
                // firstName: vendorData.firstName,
                // lastName: vendorData.lastName,
                // address: vendorData.address,
                // city: vendorData.city,
                // state: vendorData.state,
                ...req.body,
            };
            let updateModule = await vendor.findOneAndUpdate(
                { _id: vendorData._id },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "Vendor Profile Updated Successfully.",
            });
        } catch (e) {
            console.log("updateVendor err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in vendor Update",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update, 'profileImage', 'image'));
