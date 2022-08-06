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
async function getTag(req, res) {

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

            let findData = await tagPage.findOne({ _id: req.body._id });
            console.log("findData is", findData);
            if (findData) {
                // if data found check verified or not
                res.send({ status: true, message: "Tag Page Data", data: findData });
            } else {
                res.send({ status: true, message: "Tag Page Data not found" });
            }
        } catch (e) {
            console.log(" err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in getting tag Page",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getTag);