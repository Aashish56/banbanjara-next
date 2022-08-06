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

const createTourGraphicSchema = Joi.object({
    symbol: Joi.string(),
    text: Joi.string(),
    displayOrder: Joi.string()

})
async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not createowed" });
        }
        try {
            res.send({
              status: true,
              message: CONSTANTSMESSAGE.CREATE_SUCCESS_MESSAGE,
            });
          } catch (e) {
            console.log("TourUSPHelpor err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in creating quick fact",
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(upload(create,'TourUSP','image'));