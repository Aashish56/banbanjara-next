import dbConnect from "../../../database/lib/dbConnect";
import tourCard from "../../../../database/schema/destination";
import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const updateBlogStatusSchema = Joi.object({
    _id: Joi.string().trim().required(),
    active: Joi.boolean().required(),
});

async function getDestination(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {
        try {
            console.log('this is Rq param -----------> ' , req.params);
            const space = new RegExp("-", "g");
            const slug = req.params.slug.replace(space, "\\s*");
            const re = new RegExp(slug);
            let slugData = await tourCard.findOne({
              title: { $regex: re, $options: "i" },
            });
                res.send({
                  status: false,
                  message: 'Data Fetched Successfully ',
                  data: slugData
              });
          } catch (e) {
              console.log("fetch Popluar Destination err", e);
              await errorResponseHelper({
                  res,
                  error: e,
                  defaultMessage: "Error while fething data of Popular Destionation " + e,
              });
          }
    }
    catch (e) {
        console.log('createBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }

};

export default handler(getDestination);



