import dbConnect from "../../../database/lib/dbConnect";
import allDestination from "../../../database/schema/allDestinationPage";
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

async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }
        // let validateData = allDestination.validate(req.body);
        // if (validateData.error) {
        //     return res.json({ status: false, error: validateData, message: "Invalid data" });
        // }

        console.log('this is create req boidys ------------>', req.body);
        try {
            let allDestinationData = _.pick(req.body, [
                "title",
                "coverImage",
                "country",
                "state",
                "city",
            ]);
            let savedAllDestinationData = await new allDestination(allDestinationData).save();
            // console.log('response from the Mongoose server --------------->', savedAllDestinationData);
            // saveVendor = savedAttractionData.toObject();
            res.send({ status: true, error: false, message: "Attraction Added.", data: savedAllDestinationData });

        } catch (e) {
            console.log("creaAtttraction err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Create All Destination ",
            });
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

export default handler(create);