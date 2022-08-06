import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../../database/schema/attractionPage";
import errorResponseHelper from "../../../../Helper/errorResponse";
import { handler } from "../../../../middlewares/parser";
export const config = {
  api: {
      bodyParser: false,
  },
};

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

async function getById(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        try {
            const singleData = await attraction.findOne({
                _id: req.params.id,
            });
            if (!singleData) {
                res.send({ status: true, data: null, message: "Attraction Not Found" });
            }
            res.send({ status: true, data: singleData });
        } catch (e) {
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Get Single Attraction ",
            });
        }


    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(getById);
