const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import travelWith from "../../../database/schema/travelWith";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
 
const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const schema = Joi.object({
    _id: Joi.string().required(),
});

async function deleteTravelWith(req, res) {
    try {
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }
        // Getting Travel With from Database
        let deleteData = await travelWith.remove({ _id: req.body._id });
        console.log('deleteData is', deleteData)
        if (deleteData) {
            // if data found check verified or not
            res.send({ status: true, message: "Travel With Deleted Successfully" });
        } else {
            res.send({ status: true, message: "Travel With not found" });
        }


    }
    catch (e) {
        console.log('create Travel With Helper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }
}
export default handler(deleteTravelWith);