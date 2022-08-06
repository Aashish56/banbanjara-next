import dbConnect from "../../../database/lib/dbConnect";
import homePage from "../../../database/schema/homePage";
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

const moduleSchema = Joi.object({
    title: Joi.string().required(),
    order: Joi.number().required(),
    link: Joi.string().trim().required(),
});


async function getSingle(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let findData = await homePage.findOne({}).sort({ _id: -1 });
            // let obj = {
            //   // total: findData.length,
            //   data: findData,
            // };
            let message = "";
            if (!findData) {
              message = "Not found";
            }
            res.send({ status: true, message, data: findData });
          } catch (e) {
            // console.log("Getting list err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error in Getting list",
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getSingle);