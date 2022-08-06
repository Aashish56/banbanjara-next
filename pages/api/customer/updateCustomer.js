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

const updateCustomerSchema = Joi.object({
    _id: Joi.string().required(),
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim(),
    // address: Joi.string().trim(),
    city: Joi.string().trim(),
    state: Joi.string().trim(),
    dateOfBirth: Joi.string().trim(),
    isMarried: Joi.boolean().required(),
    dateOfAnniversary: Joi.string().allow(null),
    email: Joi.string().email().trim().required(),
    mobile: Joi.string().required(),
    aadharNumber: Joi.number(),
    gender: Joi.string().trim(),
    alternativeMobile: Joi.number(),
    country: Joi.string().trim(),
    address: Joi.string().trim(),
    emergencyName: Joi.string().trim(),
    emergencyContact: Joi.number(),
    emergencyRelation: Joi.string().trim(),
    password: Joi.string().required(),
    about: Joi.string(),
    isEmailVerified: Joi.boolean(),
    isMobileVerified: Joi.boolean(),
    profileImage: Joi.any(),
    accountno: Joi.string(),
    active: Joi.boolean(),
    customerCreationDate: Joi.date(),
    updated: Joi.date(),
    verificationToken: Joi.string(),
    _v:Joi.number()
  });


async function update(req, res) {

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
            let validateData = updateCustomerSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            // pick data from req.body
            let customerData = _.pick(req.body, [
                '_id',
                'firstName',
                'lastName',
                'city',
                'state',
            ]);
            setData = {
                firstName: customerData.firstName,
                lastName: customerData.lastName,
                address: customerData.address,
                city: customerData.city,
                state: customerData.state,
            };
            let updateModule = await customer.findOneAndUpdate(
                { _id: customerData._id },
                { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
                status: true,
                message: 'Customer Profile Updated Successfully.',
            });
        } catch (e) {
            console.log('updateCustomer err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in customer Update',
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

export default handler(multiUpload(update,'user',ProfileMedia));