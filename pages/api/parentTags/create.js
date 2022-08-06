import dbConnect from "../../../database/lib/dbConnect";
import parentTags from "../../../database/schema/parentTags";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createParentTagSchema = Joi.object({
    name: Joi.string().required(),
    category: Joi.object().required(),
    displayOrder: Joi.string(),
  });

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            let validateData = createParentTagSchema.validate(req.body);
            if (validateData.error) {
              throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
              };
            }
      
            let bodyData = req.body;
      
            console.log('bodyData-', bodyData);
      
            await new parentTags(bodyData).save();
      
            res.send({
              status: true,
              message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
          } catch (e) {
            console.log("ParentTag Helper err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in creating parent tags",
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);