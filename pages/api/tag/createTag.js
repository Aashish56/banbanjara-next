import dbConnect from "../../../database/lib/dbConnect";
import tag from "../../../database/schema/tag";
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

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            // let validateData = moduleSchema.validate(req.body);
            // if (validateData.error) {
            //   throw {
            //     status: false,
            //     error: validateData,
            //     message: CONSTANTSMESSAGE.INVALID_DATA,
            //   };
            // }
      
            // pick data from req.body
            let bodyData = _.pick(req.body, [
              'parentTagTitle',
              'parentTagDisplayOrder',
              'subTags',
            ]);
      
            // if (req.files?.length > 0) bodyData.image = req.files;
      
            let saveModule = await new tag(bodyData).save();
            console.log('saveModule is', saveModule);
            res.send({
              status: true,
              message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
          } catch (e) {
            console.log('save Module err', e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: 'Error in saveModule',
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create,'Tag','image'));