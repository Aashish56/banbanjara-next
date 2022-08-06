const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");
// const CONSTANTSMESSAGE = require('../../../Helper/constantsMessage')
const schema = Joi.object({
    _id: Joi.string().required(),
});

async function getTours(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        let validateData = schema.validate(req.body);
        if (validateData.error) {
            throw { status: false, error: validateData, message: "Invalid data" };
        }

        // Getting Tours from Database
        let ToursData = await tours.findById(req.body._id);
        if (ToursData) {
            // if data found check verified or not
            res.send({ status: true, message: "Tours Details", data: ToursData });
        } else {
            res.send({ status: true, message: "Tours not found" });
        }
    } catch (e) {
        console.log("ToursData err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in ToursData",
        });
    }
}
export default handler(getTours);
