import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  

const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const taxes = "../../../database/schema/taxes";
const errorResponseHelper = require("../../../Helper/errorResponse");

const schema = Joi.object({
    _id: Joi.string().required(),
});

async function deleteTaxes(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }

        // Getting Themes from Database
        let deleteData = await taxes.remove({ _id: req.body._id });
        console.log("deleteData is", deleteData);
        if (deleteData) {
            // if data found check verified or not
            res.send({ status: true, message: "Taxes Deleted Successfully" });
        } else {
            res.send({ status: true, message: "Taxes not found" });
        }
    } catch (e) {
        console.log("create Taxes Helper err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in SignUp",
        });
    }
}
export default handler(deleteTaxes);
