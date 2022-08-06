import dbConnect from "../../../database/lib/dbConnect";
import state from "../../../database/schema/state";
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

const createCountrySchema = Joi.object({
    name: Joi.string().required(),
    iso: Joi.string().trim().required(),
    code: Joi.number().required(),
});



async function createState(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = createStateSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: "Invalid data" };
            }
      
            // pick data from req.body
            let stateData = _.pick(req.body, ["countryId", "name"]);
      
            // setting name to lowercase
            stateData.name = String(stateData.name).trim().toLowerCase();
      
            // searching email or mobile already exists or not
            let findData = await state.findOne({ name: stateData.name });
            if (findData) {
              // if not active, ie disabled by admin
              if (!findData.active) {
                throw {
                  status: false,
                  error: true,
                  message:
                    "State you are tring to add is already exists and it is disable please change status",
                  statusCode: 401,
                };
              }
              throw {
                status: false,
                error: true,
                message: "State already exists",
                statusCode: 401,
              };
            }
      
            // creating unique token
            let saveState = await new state(stateData).save();
            if (saveState)
              res.send({ status: true, error: false, message: "State Added." });
            res.send({
              status: false,
              error: true,
              message: "Error while adding State",
            });
          } catch (e) {
            console.log("create State err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "create State err",
            });
          }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(createState);