import dbConnect from "../../../database/lib/dbConnect";
import landingPage from "../../../database/schema/landing";
import multiUpload from "../../../middlewares/multiUpload";
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

const createItinerarySchema = Joi.object({
    tourId: Joi.string(),
    title: Joi.string(),
    displayOrder: Joi.string(),
    description: Joi.string()

})



async function create(req, res) {

    await dbConnect();
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not allowed" });
        }

        try {
            // validate data using joi
            //   let validateData = createCitySchema.validate(req.body);
            //   if (validateData.error) {
            //     throw { status: false, error: validateData, message: "Invalid data" };
            //   }
            if (req.files?.cover?.length > 0) req.body['cover'] = req.files.cover[0].path;
            if (req.body?.featuredTag) {
                const featured = req.body.featuredTag.split(',');
                req.body.featuredTag = featured;
            }
            const saveLanding = await new landingPage(req.body).save();
            res.send({ status: true, error: false, message: "Landing page saved.", data: saveLanding });
        } catch (e) {
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Landing page not added",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

const pageMedia = [{
    name: 'image',
    maxCount: 1
},
{
    name: 'icon',
    maxCount: 1
}
];

export default handler(multiUpload(create,'Landing',pageMedia));