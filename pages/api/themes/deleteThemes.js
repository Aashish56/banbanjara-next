const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)
import themes from "../../../database/schema/themes";
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

async function deleteThemes(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }


        // Getting Themes from Database
        let deleteData = await themes.remove({ _id: req.body._id });
        console.log('deleteData is', deleteData)
        if (deleteData) {
            // if data found check verified or not
            res.send({ status: true, message: "Themes Deleted Successfully" });
        } else {
            res.send({ status: true, message: "Themes not found" });
        }


    }
    catch (e) {
        console.log('create Themes Helper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }
}
export default handler(deleteThemes);