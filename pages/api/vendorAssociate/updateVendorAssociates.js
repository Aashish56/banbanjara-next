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

const updateVendorAssociateSchema = Joi.object({
    vendorId: Joi.string().required(),
    _id: Joi.string().required(),
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    mobile: Joi.string().trim(),
    secondaryMobile: Joi.number().allow(''),
    email: Joi.string().email().trim(),
    designation: Joi.string().allow(null),
    active: Joi.boolean(),
    vendorAssociateCreationDate: Joi.date(),
    updated: Joi.date(),

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
            let validateData = updateVendorAssociateSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            // pick data from req.body
            let vendorData = _.pick(req.body, [
                "_id",
                "firstName",
                "lastName",
                "mobile",
                "secondaryMobile",
                "email",
                "designation",
                "vendorId",
            ]);
            setData = {
                // firstName: vendorData.firstName,
                // lastName: vendorData.lastName,
                // address: vendorData.address,
                // city: vendorData.city,
                // state: vendorData.state,
                ...req.body,
            };
            let updateModule = await vendorAssociate.findOneAndUpdate(
                { _id: vendorData._id, vendorId: vendorData.vendorId },
                { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
                status: true,
                message: "VendorAssociate Profile Updated Successfully.",
            });
        } catch (e) {
            console.log("updateVendorAssociate err", e);
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

export default handler(update);