import dbConnect from "../../../database/lib/dbConnect";
import tagPage from "../../../database/schema/tagPage";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const getTagPageSchema = Joi.object({
    _id: Joi.string().trim().required(),
});
async function deleteTagPage(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            let validateData = getTagPageSchema.validate(req.body);
            if (validateData.error) {
                throw { status: false, error: validateData, message: "Invalid data" };
            }

            let deleteData = await tagPage.remove({ _id: req.body._id });
            console.log("deleteData is", deleteData);
            if (deleteData) {
                // if data found check verified or not
                res.send({ status: true, message: "TagPage Deleted Successfully" });
            } else {
                res.send({ status: true, message: "TagPage not found" });
            }
        } catch (e) {
            console.log("Helper err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in deletion",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(deleteTagPage);