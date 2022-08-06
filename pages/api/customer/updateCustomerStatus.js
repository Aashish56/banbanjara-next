import dbConnect from "../../../database/lib/dbConnect";
import customer from "../../../database/schema/customer";
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

const updateCustomerStatusSchema = Joi.object({
    _id: Joi.objectId().required(),
    active: Joi.boolean().required(),
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
            console.log('req.body', req);
            let validateData = updateCustomerStatusSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: 'Invalid data' };
            }

            let bodyData = _.pick(req.body, ['active', '_id']);
            let setData = {
                active: bodyData.active,
            };
            let updateModule = await Models.CustomerDB.findOneAndUpdate(
                { _id: bodyData._id },
                { $set: setData }
            );
            console.log('updateModule is', updateModule);
            res.send({
                status: true,
                error: false,
                message: CONSTANTSMESSAGE.STATUS_UPDATE_SUCCESS,
            });
        } catch (e) {
            console.log('createCustomerHelper err', e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: 'Error in updateCustomerStatus',
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }
};

export default handler(update);