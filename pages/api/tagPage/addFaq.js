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

async function addFaq(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            console.log('this is request Body ---------------> ', req.body)
            const data = await tagPage.findOne({ _id: req.body.id });
            data.faq = [...req.body.faq];
            const finalAddedData = await tagPage.findOneAndUpdate({ _id: req.body.id }, { $set: data });
            res.send({ status: true, error: false, message: "Tag Page Faq Added", data: finalAddedData });
        } catch (err) {
            console.log("Add Faq's err", err);
            await errorResponseHelper({
                res,
                error: err,
                defaultMessage: "Error in adding Faq's",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(addFaq);