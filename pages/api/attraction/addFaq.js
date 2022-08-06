import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../database/schema/attractionPage";
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

// const allDestination = Joi.object({
//     title: Joi.string(),
//     coverImage: Joi.string(),
//     country: Joi.string(),
//     state: Joi.string(),
//     city: Joi.string(),
// });

async function faq(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            console.log('this is request Body ---------------> ', req.body)
            const data = await attraction.findOne({ "_id": req.body.id });
            data.faq = [...req.body.faq];
            await Models.AttractionPageDB(data).save();
            res.send({ status: true, error: false, message: "Attraction Added", data: data })
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

export default handler(faq);
