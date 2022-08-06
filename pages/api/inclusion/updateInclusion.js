import dbConnect from "../../../database/lib/dbConnect";
import inclusion from "../../../database/schema/inclusion";
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

const moduleSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string(),
  metaTitle: Joi.string(),
  metaKeywords: Joi.string(),
  metaDescription: Joi.string(),
  displayOrder: Joi.string(),
});


async function update(req, res) {

  await dbConnect();
  try {
    if (req.method != 'POST') {
      return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }

    try {
      console.log(req.body);
      // validate data using joi
      let validateData = moduleSchema.validate(req.body);
      if (validateData.error) {
        throw {
          status: false,
          error: validateData,
          message: CONSTANTSMESSAGE.INVALID_DATA,
        };
      }

      // pick data from req.body

      let bodyData = _.pick(req.body, [
        "_id",
        "name",
        "description",
        "metaTitle",
        "metaKeywords",
        "metaDescription",
        "displayOrder",
      ]);

      let setData = {
        name: bodyData.name,
        description: bodyData.description,
        metaTitle: bodyData.metaTitle,
        metaKeywords: bodyData.metaKeywords,
        metaDescription: bodyData.metaDescription,
        displayOrder: bodyData.displayOrder,
      };
      if (req.files.length > 0) {
        bodyData.image = req.files;
        setData["image"] = bodyData.image;
      }
      let updateModule = await inclusion.findOneAndUpdate(
        { _id: bodyData._id },
        { $set: setData }
      );
      console.log("updateModule is", updateModule);
      res.send({ status: true, message: "Inclusion Updated Successfully." });
    } catch (e) {
      console.log("saveModule err", e);
      await errorResponseHelper({
        res,
        error: e,
        defaultMessage: "Error in saveModule",
      });
    }

  } catch (error) {
    console.log(error);
    return res.json({ status: false, error: true, errorMessage: error });
  }


};
export default handler(upload(update, 'inclusion', 'image'));