import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};
import dbConnect from "../../../database/lib/dbConnect";
import tagPage from "../../../database/schema/tagPage";
import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

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
            let slugData = await tagPage.findOne({
                title: { $regex: re, $options: "i" },
            });
            res.send({
                status: true,
                message: "slug data fetched Sucessfully",
                data: slugData,
            });
            // }

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