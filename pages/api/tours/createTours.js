import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
import upload from "../../../middlewares/upload";
const _ = require("lodash");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
    // tab-1
    cardImage: Joi.string(),
    cardCapsion: Joi.string(),
    title: Joi.string().required(),
    bookingConfirmation: Joi.string().required(),
    stay: Joi.boolean(),
    priceType: Joi.string(),
    productAction: Joi.array().required(),
    contactNumber: Joi.string(),
    hours: Joi.string(),
    minute: Joi.string(),
    night: Joi.string(),
    days: Joi.string(),
    description: Joi.string().required(),

    // tab-2
    galleryImages: Joi.array(),

    // tab-3
    inclusion: Joi.array(),
    quickFacts: Joi.array(),
    whatsIncluded: Joi.array(),
    tourGraphics: Joi.array(),
    tourUSP: Joi.array(),
    thingsToKnow: Joi.array(),
    policies: Joi.array(),
    tags: Joi.array(),
    averageRating: Joi.string(),
    extraEnclusion: Joi.string(),


    // tab-4
    country: Joi.object().required(),
    state: Joi.object().required(),
    city: Joi.object().required(),
    startPoint: Joi.object(),
    endPoint: Joi.object(),

    // tab-5
    mainPrice: Joi.string().required(),
    discount: Joi.string(),
    basicPrice: Joi.string().required(),

    // tab-6
    slug: Joi.string().required(),
    metaTitle: Joi.string().required(),
    metaDescription: Joi.string(),
    metaKeywords: Joi.string(),
    OgTitle: Joi.string(),
    OgDescription: Joi.string(),
    OgTags: Joi.array(),

    // tab-7
    adImage: Joi.string(),
    adUrl: Joi.string(),
    adOpenIn: Joi.string(),
});

async function createTours(req, res) {
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }

        let bodyData = req.body;

        console.log(bodyData);

        await new tours(bodyData).save();
        // console.log("saveModule is", saveModule);
        res.send({
            status: true,
            message: "Tours Created Successfully.",
        });
    } catch (e) {
        console.log("save Module err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in saveModule",
        });
    }
}
export default handler(upload(createTours,'tour','image'));
