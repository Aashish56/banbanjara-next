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


async function getAll(req, res) {

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
            // Getting all Customers from Database
            let findData = await customer.find().sort({ _id: -1 });
            if (findData.length) {
                // if data found check verified or not
                res.send({ status: true, message: 'Customers List', data: findData });
            } else {
                res.send({ status: true, message: 'No Data found for Customers' });
            }
        } catch (e) {
            console.log('getAllCustomerHelper err', e);
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

export default handler(getAll);