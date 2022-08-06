import dbConnect from "../../../database/lib/dbConnect";
import tourCard from "../../database/schema/destination";
import errorResponseHelper from "../../Helper/errorResponse";
import multiUpload from "../../middlewares/multiUpload";
import { handler } from "../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};

// import upload from "../../../middlewares/upload";
const _ = require('lodash');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


async function create(req, res) {

    await dbConnect();
    if (req.method != 'POST') {
        return res.json({ status: false, error: true, message: "HTTP method not allowed" });
    }
    try {

        try {
            // validate data using joi
            //   let validateData = createCitySchema.validate(req.body);
            //   if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            //   }

            if (req.files?.cover?.length > 0) req.body['cover'] = req.files.cover[0].path;
            if (req.body?.tourCards1) {
                const tourCard = req.body.tourCards1.split(',');
                req.body.tourCards1 = tourCard;
            }

            if (req.body?.tourCards2) {
                const tourCard = req.body.tourCards2.split(',');
                req.body.tourCards2 = tourCard;
            }
            if (req.body?.featuredTag) {
                const featured = req.body.featuredTag.toString();
                req.body.featuredTag = featured;
            }
            let saveDestination = await new tourCard(req.body).save();
            res.send({ status: true, error: false, message: "Destination page saved.", data: saveDestination });
        } catch (e) {
            console.log(e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Destination page not added",
            });
        }
    }
    catch (e) {
        console.log('createBlogHelper err', e);
        await errorResponseHelper({ res, error: e, defaultMessage: "Error in SignUp" });
    }
};

const pageMedia = [{
    name: 'image',
    maxCount: 1
},
{
    name: 'icon',
    maxCount: 1
},
{
    name: 'cover',
    maxCount: 1
}
];


export default handler(multiUpload(create, 'Destination', pageMedia));



