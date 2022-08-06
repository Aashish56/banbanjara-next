import dbConnect from "../../../database/lib/dbConnect";
import tourUSP from "../../../database/schema/tourGraphic";
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

const updateTourUSPSchema = Joi.object({
    _id: Joi.string().required(),
    symbol: Joi.string().required(),
    text: Joi.string().required(),
    displayOrder: Joi.string(),
    description: Joi.string(),
  });
async function update(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }

        try {
            // console.log(req.sessionID)
            // validate data using joi
            let validateData = updateTourUSPSchema.validate(req.body);
            if (validateData.error) {
              throw { status: false, error: validateData, message: "Invalid data" };
            }
      
            // pick data from req.body
            let TourUSPData = _.pick(req.body, [
              "_id",
              "text",
              "symbol",
              "displayOrder",
              "description",
            ]);
            console.log("TourUSPData", req.files);
            setData = {
              text: TourUSPData.text,
              symbol: TourUSPData.symbol,
              displayOrder: TourUSPData.displayOrder,
              description: TourUSPData.description,
            };
            let updateModule = await tourUSP.findOneAndUpdate(
              { _id: TourUSPData._id },
              { $set: setData }
            );
            console.log("updateModule is", updateModule);
            res.send({
              status: true,
              message: "Quick Fact Updated Successfully.",
            });
          } catch (e) {
            console.log("updateTourUSP err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in TourUSP Update",
            });
          }
        
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};
export default handler(upload(update,'TourUSP','image'))
