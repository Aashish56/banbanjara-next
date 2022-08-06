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

async function get(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        try {
            if (req.body.city) {
                const data = await attraction.find({
                    'city.name': req.body.city.name,
                });
                res.send({
                    status: true,
                    message: "Related Articles for City fetched Sucessfully",
                    data: data,
                });
                return;
            }
            if (req.body.state) {
                const data = await attraction.find({
                    'state.name': req.body.state.name,
                });
                res.send({
                    status: true,
                    message: "Related Articles for State fetched Sucessfully",
                    data: data,
                });
                return;
            }
            if (req.body.country) {
                const data = await attraction.find({
                    'country.name': req.body.country.name,
                });
                res.send({
                    status: true,
                    message: "Related Articles for Country fetched Sucessfully",
                    data: data,
                });
                return;
            }
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

export default handler(get);
