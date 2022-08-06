import dbConnect from "../../../database/lib/dbConnect";
import quickFact from "../../../database/schema/quickFact";
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

async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let findData = await quickFact.find().sort({ _id: -1 });
            if (findData.length) {
              // if data found check verified or not
              res.send({ status: true, message: 'Quick Facts List', data: findData });
            } else {
              res.send({ status: true, message: 'No Data found for Quick Facts' });
            }
          } catch (e) {
            console.log(' err', e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: 'Error in getting quick facts',
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);