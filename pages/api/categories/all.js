import dbConnect from "../../../database/lib/dbConnect";
import categories from "../../../database/schema/categories";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const sendSupplierMailHelper = require('../../../Helper/sendSupplierMailHelper');
// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createCategorySchema = Joi.object({
    name: Joi.string().required(),
    displayOrder: Joi.string(),
  });


async function all(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            let findData = await categories.find().sort({ _id: -1 });
            if (findData.length) {
              // if data found check verified or not
              res.send({
                status: true,
                message: "Categories List",
                data: findData,
              });
            } else {
              res.send({ status: true, message: "No categories found" });
            }
          } catch (e) {
            console.log(" err", e);
            await errorResponseHelper({
              res,
              error: e,
              defaultMessage: "Error getting categories",
            });
          }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(all);