import dbConnect from "../../../database/lib/dbConnect";
import inclusion from "../../../database/schema/inclusion";
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
    _id: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    metaTitle: Joi.string(),
    metaKeywords: Joi.string(),
    metaDescription: Joi.string(),
    displayOrder: Joi.string(),
  });


async function getAll(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            let findData = await inclusion.find({}).sort({ _id: -1 });
            let obj = {
                total: findData.length,
                list: findData
            }
            res.send({ status: true, message: "", data: obj });
        }
        catch (e) {
            console.log('Getting list err', e);
            await errorResponseHelper({ res, error: e, defaultMessage: "Error in Getting list" });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getAll);