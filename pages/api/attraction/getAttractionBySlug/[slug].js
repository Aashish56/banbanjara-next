import dbConnect from "../../../../database/lib/dbConnect";
import attraction from "../../../../database/schema/attractionPage";
import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};


const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

// const allDestination = Joi.object({
//     title: Joi.string(),
//     coverImage: Joi.string(),
//     country: Joi.string(),
//     state: Joi.string(),
//     city: Joi.string(),
// });

async function getBySlug(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            const space = new RegExp("-", "g");
            const slug = req.params.slug.replace(space, "\\s*");
            const re = new RegExp(slug);
            let slugData = await attraction.findOne({
              title: { $regex: re, $options: "i" },
            });
            // const slug = req.params.slug.replace(/-/gi, ' ');
            // const slugData = await Models.AttractionPageDB.findOne({ title: slug });
            res.send({
              status: true,
              message: "slug data fetched Sucessfully",
              data: slugData,
            });
          
      
          } catch (e) {
            console.log("updateModule err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error while fething data with slug",
            });
          }


    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getBySlug);
