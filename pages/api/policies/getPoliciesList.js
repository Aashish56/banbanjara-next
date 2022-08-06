import dbConnect from "../../../database/lib/dbConnect";
import policies from "../../../database/schema/policies";
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

const getPoliciesSchema = Joi.object({
    _id: Joi.string().trim().required(),
  });

async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let validateData = getPoliciesSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: "Invalid data" };
            }
      
            let findData = await policies.findOne({ _id: req.body._id });
            if (findData) {
              // if data found check verified or not
              res.send({ status: true, message: "Policies Data", data: findData });
            } else {
              res.send({ status: true, message: "Policies Data not found" });
            }
          } catch (e) {
            console.log(" err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in getting Policies",
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);