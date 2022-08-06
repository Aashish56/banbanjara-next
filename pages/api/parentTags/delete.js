import dbConnect from "../../../database/lib/dbConnect";
import parentTags from "../../../database/schema/parentTags";
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

const getParentTagSchema = Joi.object({
    _id: Joi.string().trim().required(),
  });

async function deleteParentTag(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        try {
            let validateData = getParentTagSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let deleteData = await parentTags.remove({ _id: req.body._id });
            console.log("deleteData is", deleteData);
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "ParentTag deleted successfully" });
            } else {
                res.send({ status: true, message: "ParentTag not found" });
            }
        } catch (e) {
            console.log("Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error deleting category. Please try again!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteParentTag);