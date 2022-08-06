import dbConnect from "../../../database/lib/dbConnect";
import attraction from "../../../database/schema/attractionPage";
import multiUpload from "../../../middlewares/multiUpload";
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

        // console.log('this is create req boidys ------------>', req.body);
        try {
            let attractionData = _.pick(req.body, [
                "title",
                "coverImage",
                "country",
                "state",
                "city",
                "attractionCards",
                "promontionSideBar",
                "promotionBar",
                "faq",
            ]);
            // console.log("req.files is", req.files);
            // if (req.files.coverImage)
            // attractionData.coverImage = req.files.coverImage;
            let savedAttractionData = await new attraction(
                attractionData
            ).save();
            // saveVendor = savedAttractionData.toObject();
            res.send({
                status: true,
                error: false,
                message: "Attraction Added.",
                data: savedAttractionData,
            });
        } catch (e) {
            console.log("creaAtttraction err", e);
            await errorResponseHelper({
                res,
                error: e,
                defaultMessage: "Error in Create Attraction",
            });
        }

    } catch (error) {
        console.log(error);
        return res.json({ status: false, error: true, errorMessage: error });
    }


};

const pageMedia = [{
    name: 'coverImage',
}, {
    name: 'promotionSideBarImage',
}, {
    name: 'promotionaSideBar',
}, {
    name: 'attractionCard'
}];

export default handler(create,'attractionPage', pageMedia);