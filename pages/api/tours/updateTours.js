const _ = require("lodash");
const Joi = require("joi");
const mongoose = require("mongoose");
Joi.objectId = require("joi-objectid")(Joi);
import upload from "../../../middlewares/upload";
import tours from "../../../database/schema/tours";
import errorResponseHelper from "../../../Helper/errorResponse";
import { handler } from "../../../middlewares/parser";
export const config = {
    api: {
        bodyParser: false,
    },
};
  
const errorResponseHelper = require("../../../Helper/errorResponse");
const CONSTANTSMESSAGE = require("../../../Helper/constantsMessage");
const moduleSchema = Joi.object({
    // tab-1
    _id: Joi.string().required(),
    title: Joi.string().required(),
    cardImage: Joi.string().allow(""),
    cardCapsion: Joi.string().allow(""),
    bookingConfirmation: Joi.string().required(),
    stay: Joi.boolean(),
    priceType: Joi.string().allow(""),
    productAction: Joi.array().required(),
    contactNumber: Joi.string().allow(""),
    hours: Joi.string().allow(""),
    minute: Joi.string().allow(""),
    night: Joi.string().allow(""),
    days: Joi.string().allow(""),
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
    averageRating: Joi.string().allow(""),
    extraEnclusion: Joi.string().required(),

    // tab-4
    country: Joi.object().required(),
    state: Joi.object().required(),
    city: Joi.object().required(),
    startPoint: Joi.object(),
    endPoint: Joi.object(),

    // tab-5
    mainPrice: Joi.string().required(),
    discount: Joi.string().allow(""),
    basicPrice: Joi.string().required(),

    // tab-6
    slug: Joi.string().required(),
    metaTitle: Joi.string().required(),
    metaDescription: Joi.string().allow(""),
    metaKeywords: Joi.string().allow(""),
    OgTitle: Joi.string().allow(""),
    OgDescription: Joi.string().allow(""),
    OgTags: Joi.array(),

    // tab-7
    adImage: Joi.string().allow(""),
    adUrl: Joi.string().allow(""),
    adOpenIn: Joi.string().allow(""),

    // extra for update only
    isDisable: Joi.boolean(),
    created: Joi.string().allow(""),
    updated: Joi.string().allow(""),
    relatedTours: Joi.array(),
});
const variantSchema = Joi.object({
    // tab-1
    id: Joi.string().required(),
    // image: Joi.array().items(Joi.object().allow(null)),
    variants: Joi.string().required(),
});
async function updateTours(req, res) {
    delete req.body.__v;
    try {
        if (req.method != 'POST') {
            return res.json({ status: false, error: true, message: "HTTP method not Allowed" });
        }
        // validate data using joi
        let validateData = moduleSchema.validate(req.body);
        if (validateData.error) {
            throw {
                status: false,
                error: validateData,
                message: CONSTANTSMESSAGE.INVALID_DATA,
            };
        }
        // pick data from req.body
        let bodyData = _.pick(req.body, [
            // tab-1
            "_id",
            "title",
            "cardImage",
            "cardCapsion",
            "bookingConfirmation",
            "stay",
            "priceType",
            "productAction",
            "contactNumber",
            "hours",
            "minute",
            "night",
            "days",
            "description",

            // tab-2
            "galleryImages",

            // tab-3
            "inclusion",
            "quickFacts",
            "whatsIncluded",
            "tourGraphics",
            "tourUSP",
            "thingsToKnow",
            "policies",
            "tags",
            "averageRating",
            "extraEnclusion",

            // tab-4
            "country",
            "state",
            "city",
            "startPoint",
            "endPoint",

            // tab-5
            "mainPrice",
            "discount",
            "basicPrice",

            // tab-6
            "slug",
            "metaTitle",
            "metaDescription",
            "metaKeywords",
            "OgTitle",
            "OgDescription",
            "OgTags",

            // tab-7
            "adImage",
            "adUrl",
            "adOpenIn",

            // extra for update only
            "isDisable",
            "created",
            "updated",
            "relatedTours",
            "variants",
        ]);
        bodyData.variants.forEach((element) => {
            element.inclusions.forEach((inclusion) => {
                inclusion = mongoose.Types.ObjectId(inclusion);
            });
        });
        let setData = {
            // tab-1
            title: bodyData.title,
            cardImage: bodyData.cardImage,
            cardCapsion: bodyData.cardCapsion,
            bookingConfirmation: bodyData.bookingConfirmation,
            stay: bodyData.stay,
            priceType: bodyData.priceType,
            productAction: bodyData.productAction,
            contactNumber: bodyData.contactNumber,
            hours: bodyData.hours,
            minute: bodyData.minute,
            night: bodyData.night,
            days: bodyData.days,
            description: bodyData.description,

            // tab-2
            galleryImages: bodyData.galleryImages,

            // tab-3
            inclusion: bodyData.inclusion,
            quickFacts: bodyData.quickFacts,
            whatsIncluded: bodyData.whatsIncluded,
            tourGraphics: bodyData.tourGraphics,
            tourUSP: bodyData.tourUSP,
            thingsToKnow: bodyData.thingsToKnow,
            policies: bodyData.policies,
            tags: bodyData.tags,
            averageRating: bodyData.averageRating,
            extraEnclusion: bodyData.extraEnclusion,

            // tab-4
            country: bodyData.country,
            state: bodyData.state,
            city: bodyData.city,
            startPoint: bodyData.startPoint,
            endPoint: bodyData.endPoint,

            // tab-5
            mainPrice: bodyData.mainPrice,
            discount: bodyData.discount,
            basicPrice: bodyData.basicPrice,

            // tab-6
            slug: bodyData.slug,
            metaTitle: bodyData.metaTitle,
            metaDescription: bodyData.metaDescription,
            metaKeywords: bodyData.metaKeywords,
            OgTitle: bodyData.OgTitle,
            OgDescription: bodyData.OgDescription,
            OgTags: bodyData.OgTags,

            // tab-7
            adImage: bodyData.adImage,
            adUrl: bodyData.adUrl,
            adOpenIn: bodyData.adOpenIn,

            // extra for update only
            relatedTours: bodyData.relatedTours,
            variants: bodyData.variants,
        };

        let updateModule = await tours.findOneAndUpdate(
            { _id: bodyData._id },
            { $set: setData }
        );
        console.log("updateModule is", updateModule);
        res.send({ status: true, message: "Tours Updated Successfully" });
    } catch (e) {
        console.log("saveModule err", e);
        await errorResponseHelper({
            res,
            error: e,
            defaultMessage: "Error in update Module",
        });
    }
}

export default handler(upload(updateTours,'tour','image'));
